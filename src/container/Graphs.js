import React, {Fragment} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import {
    EuiButton,
    EuiEmptyPrompt,
    EuiHorizontalRule,
    EuiInMemoryTable,
    EuiLoadingContent,
    EuiPageContent,
    EuiText
} from '@elastic/eui';

class Graphs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            historicalData: {},
            loading: false,
            isTableLoading: false,
            error: null,
            selection: []
        }
    }

    async componentDidMount() {
        this.setState({loading: true});
        try {
            let config = {
                headers: {'Access-Control-Allow-Origin': '*'}
            };
            let response = await axios.get(`https://corona.lmao.ninja/countries`, config);
            this.setState({
                data: response.data
            });
            let firstCountry = response.data[0].country;
            await this.setGraphData(firstCountry);
        } catch (e) {
            this.setState({error: e})
        }
        this.setState({loading: false});
    }

    onSelectionChange = async (selectedCountry) => {
        this.setState({selection: selectedCountry});
        if (selectedCountry.length === 0) {
            return null;
        } else {
            await this.setGraphData(selectedCountry[selectedCountry.length - 1].country);
        }
    };

    setGraphData = async (countryName) => {
        let config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };
        let formatCountryName = countryName.split(',')[0];
        let url = `https://corona.lmao.ninja/v2/historical/${formatCountryName}`;
        let historicalData = await axios.get(url, config);
        let dates = Object.keys(historicalData.data.timeline.cases);
        let datesArray = dates.map(dateString => new Date(dateString));

        this.setState({
            historicalData: {
                labels: datesArray,
                datasets: [{
                    data: Object.values(historicalData.data.timeline.cases),
                    label: 'Cases in : ' + countryName,
                    borderColor: "#3e95cd",
                    fill: false
                },
                    {
                        data: Object.values(historicalData.data.timeline.deaths),
                        label: "Deaths in : " + countryName,
                        borderColor: "#c45850",
                        fill: false
                    }]
            }
        })

    };

    render() {

        const {data, loading, isTableLoading, historicalData} = this.state;

        const search = {
            box: {
                incremental: true,
            },
        };

        const selection = {
            onSelectionChange: this.onSelectionChange,
        };


        let chartOptions = {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 80,
                    fontColor: 'black'
                }
            },
            scales: {
                xAxes: [{
                    type: "time",
                    time: {parser: 'YYYY/MM/DD'},
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Infected people",
                        fontColor: "green"
                    }
                }]
            }
        };
        return (
            <div>
                <EuiPageContent style={{minHeight: 700}}>
                    {loading ?
                        <EuiLoadingContent lines={3}/> :
                        <div>
                            {data.length === 0 || historicalData.length === 0 ?
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
                                    <Line
                                        data={historicalData}
                                        options={chartOptions}
                                    />
                                    <EuiInMemoryTable
                                        items={data}
                                        itemId="country"
                                        loading={isTableLoading}
                                        columns={[
                                            {
                                                field: 'country',
                                                name: 'Country',
                                                sortable: true,
                                                truncateText: true,
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
                                        ]}
                                        search={search}
                                        // isSelectable={true}
                                        selection={selection}
                                        // pagination={true}
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

export default Graphs;