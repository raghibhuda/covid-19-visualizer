import React, {Fragment} from 'react';
import axios from 'axios';
import {
    EuiButton,
    EuiEmptyPrompt,
    EuiHorizontalRule,
    EuiInMemoryTable,
    EuiLoadingContent,
    EuiPageContent,
    EuiText
} from '@elastic/eui';

class LatestUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            isTableLoading: false,
            error: null
        }
    }

    async componentDidMount() {
        this.setState({loading: true});
        try {
            let config = {
                headers: {'Access-Control-Allow-Origin': '*'}
            };
            let response = await axios.get(`https://corona.lmao.ninja/countries`, config);
            console.log(response);
            this.setState({
                data: response.data,
            })

        } catch (e) {
            this.setState({error: e})
        }
        this.setState({loading: false});
    }

    render() {
        const {data, loading, isTableLoading} = this.state;
        const search = {
            box: {
                incremental: true,
            },
        };
        return (
            <div>
                <EuiPageContent style={{minHeight: 700}}>
                    {loading ?
                        <EuiLoadingContent lines={3}/> :
                        <div>
                            {data.length === 0 ?
                                <EuiEmptyPrompt
                                    iconType="editorStrike"
                                    title={<h2>Something Went wrong with the server</h2>}
                                    body={
                                        <Fragment>
                                            <p>
                                                This app dependent on
                                                <a href="https://github.com/NovelCOVID/API">Novel Covid API</a>
                                                May be something wrong with their server
                                            </p>
                                        </Fragment>
                                    }
                                    actions={
                                        <EuiButton
                                            color="primary"
                                            onClick={() => {
                                                window.location.reload();
                                            }}
                                            fill>
                                            Reload
                                        </EuiButton>
                                    }
                                /> :
                                <div>
                                    <EuiText color="subdued" size="s" textAlign="center">
                                        <p>
                                            Latest global updates of corona outbreak
                                        </p>
                                    </EuiText>
                                    <EuiHorizontalRule/>
                                    <EuiInMemoryTable
                                        items={data}
                                        loading={isTableLoading}
                                        columns={[
                                            {
                                                field: 'country',
                                                name: 'Country',
                                                sortable: true,
                                                truncateText: true,
                                            },

                                            {
                                                field: 'todayCases',
                                                name: 'New Cases',
                                                sortable: true,
                                                truncateText: true,
                                            },
                                            {
                                                field: 'todayDeaths',
                                                name: 'New Death',
                                                sortable: true,
                                                truncateText: true,
                                                // render: todayDeaths => {
                                                //     const color = todayDeaths<0 ? 'success' : 'danger';
                                                //     const label = todayDeaths<0 ? 'Dead' : 'Not Dead';
                                                //     return <EuiHealth color={color}>{label}</EuiHealth>;
                                                // },
                                            },
                                            {
                                                field: 'deaths',
                                                name: 'Total Death',
                                                sortable: true,
                                                truncateText: true,
                                            },
                                            {
                                                field: 'recovered',
                                                sortable: true,
                                                name: 'Total Recovered',
                                                truncateText: true,
                                            },
                                            {
                                                field: 'cases',
                                                name: 'Total Cases',
                                                truncateText: true,
                                            },
                                            {
                                                field: 'active',
                                                name: 'Active',
                                                truncateText: true,
                                            },
                                            {
                                                field: 'critical',
                                                name: 'Critical Condition',
                                                truncateText: true,
                                            },
                                            {
                                                field: 'casesPerOneMillion',
                                                name: 'Cases Per 1M',
                                                sortable: true,
                                                truncateText: true,
                                            },
                                            {
                                                field: 'deathsPerOneMillion',
                                                name: 'Deaths Per 1M',
                                                sortable: true,
                                                truncateText: true,
                                            },

                                        ]}
                                        search={search}
                                        pagination={true}
                                        sorting={true}
                                    />
                                </div>
                            }
                        </div>
                    }
                </EuiPageContent>
            </div>

        )
    }
}

export default LatestUpdate;