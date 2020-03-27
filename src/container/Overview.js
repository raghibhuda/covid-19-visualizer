import React,{Fragment} from 'react';
import axios from 'axios';
import {
    EuiButton,
    EuiCard,
    EuiFlexGroup,
    EuiFlexItem,
    EuiHorizontalRule,
    EuiIcon,
    EuiLoadingContent,
    EuiPageContent,
    EuiSpacer,
    EuiText,
    EuiTextColor,
    EuiTitle,
    EuiEmptyPrompt
} from '@elastic/eui';

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todayOverviewData: [],
            mostDeadlyCountries: [],
            loading: false,
            error: null
        }
    }

    async componentDidMount() {
        this.setState({loading: true});
        try {
            let config = {
                headers: {'Access-Control-Allow-Origin': '*'}
            };
            let response = await axios.get(`https://corona.lmao.ninja/all`, config);
            let responseMostDeadly = await axios.get(`https://corona.lmao.ninja/countries`, config);
            this.setState({
                todayOverviewData: response.data,
                mostDeadlyCountries: responseMostDeadly.data.slice(0, 4),
            })

        } catch (e) {
            this.setState({error: e})
        }
        this.setState({loading: false});
    }

    render() {
        const {todayOverviewData, mostDeadlyCountries, loading} = this.state;
        return (
            <div>
                <EuiPageContent style={{minHeight: 700}}>
                    {loading ?
                        <EuiLoadingContent lines={3}/> :
                        <div>
                            {todayOverviewData.length===0 || mostDeadlyCountries.length===0?
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
                                            onClick={()=>{window.location.reload();}}
                                            fill>
                                            Reload
                                        </EuiButton>
                                    }
                                />:
                                <div>
                                <div>
                                    <EuiText color="subdued" size="s" textAlign="center">
                                        <p>
                                            Global state of corona outbreak
                                        </p>
                                    </EuiText>
                                    <EuiHorizontalRule/>
                                    <EuiFlexGroup>
                                        <EuiFlexItem>
                                            <div className="eui-textCenter">
                                                <EuiTitle size="l">
                                                    <h2>
                                                        <EuiTextColor color="warning">Total Cases</EuiTextColor>
                                                    </h2>
                                                </EuiTitle>
                                                <EuiSpacer/>
                                                <EuiTitle>
                                                    <h1>
                                                        {todayOverviewData.cases}
                                                    </h1>
                                                </EuiTitle>
                                            </div>
                                        </EuiFlexItem>
                                        <EuiFlexItem>
                                            <div className="eui-textCenter">
                                                <EuiTitle size="l">
                                                    <h2><EuiTextColor color="danger">Deaths</EuiTextColor></h2>
                                                </EuiTitle>
                                                <EuiSpacer/>
                                                <EuiTitle>
                                                    <h2>
                                                        {todayOverviewData.deaths}
                                                    </h2>
                                                </EuiTitle>
                                            </div>
                                        </EuiFlexItem>
                                        <EuiFlexItem>
                                            <div className="eui-textCenter">
                                                <EuiTitle size="l">
                                                    <h2><EuiTextColor color="secondary">Recovered</EuiTextColor>
                                                    </h2>
                                                </EuiTitle>
                                                <EuiSpacer/>
                                                <EuiTitle>
                                                    <h1>
                                                        {todayOverviewData.recovered}
                                                    </h1>
                                                </EuiTitle>
                                            </div>
                                        </EuiFlexItem>
                                    </EuiFlexGroup>
                                </div>
                                <EuiSpacer size="xxl"/>
                                <EuiText color="danger" size="m" textAlign="center">
                                    <h3>
                                        Most Deadly Regions
                                    </h3>
                                </EuiText>
                                <EuiSpacer size="xxl"/>
                                <EuiFlexGroup>
                                    {mostDeadlyCountries.map(country => {
                                            return (
                                                <EuiFlexItem key={country.countryInfo._id}>
                                                    <EuiCard
                                                        icon={<EuiIcon size="xxl" type={country.countryInfo.flag}/>}
                                                        title={country.country}
                                                        description={
                                                            <div>
                                                                <EuiText color="warning" size="m" textAlign="center"
                                                                         className="cardDescriptionText">
                                                                    <p>Today Cases: {country.todayCases}</p>
                                                                </EuiText>
                                                                <EuiText color="danger" size="m" textAlign="center"
                                                                         className="cardDescriptionText">
                                                                    <p>Today Death {country.todayDeaths}</p>
                                                                </EuiText>
                                                                <EuiText color="default" size="m" textAlign="center"
                                                                         className="cardDescriptionText">
                                                                    <p>Total Cases: {country.cases}</p>
                                                                </EuiText>
                                                                <EuiText color="danger" size="m" textAlign="center"
                                                                         className="cardDescriptionText">
                                                                    <p>Total Deaths: {country.deaths}</p>
                                                                </EuiText>
                                                                <EuiText color="secondary" size="m" textAlign="center"
                                                                         className="cardDescriptionText">
                                                                    <p>Total recovered: {country.recovered}</p>
                                                                </EuiText>
                                                            </div>
                                                        }
                                                    />
                                                </EuiFlexItem>
                                            )
                                        }
                                    )}
                                </EuiFlexGroup>
                            </div>}
                        </div>
                    }
                </EuiPageContent>
            </div>

        )
    }
}

export default Overview;