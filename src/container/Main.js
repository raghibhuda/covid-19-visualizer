import React from 'react';
import {
    EuiPage,
    EuiPageBody,
    EuiBottomBar,
    EuiFlexGroup,
    EuiFlexItem,
    EuiButton,
} from '@elastic/eui';
import SidebarNav from "./Sidebar";
import Routes from "./Routes";

class CovidVisualizer extends React.Component {
    render() {
        return (
            <div>
                <EuiPage>
                    <SidebarNav/>
                    <EuiPageBody>
                        <Routes/>
                    </EuiPageBody>
                </EuiPage>
                <EuiBottomBar paddingSize="s">
                    <EuiFlexGroup justifyContent="spaceBetween">
                        <EuiFlexItem grow={false}>
                            <EuiFlexGroup gutterSize="s">
                                <EuiFlexItem grow={false}>
                                    <EuiButton
                                        color="ghost"
                                        size="s"
                                        iconType="database"
                                        href="https://github.com/NovelCOVID/API"
                                    >
                                         Data source
                                    </EuiButton>
                                </EuiFlexItem>
                                <EuiFlexItem grow={false}>
                                    <EuiButton
                                        color="ghost"
                                        size="s"
                                        iconType="logoGithub"
                                        href="https://github.com/raghibhuda/covid-19-visualizer"
                                    >
                                        Contribute
                                    </EuiButton>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiBottomBar>
            </div>
        )
    }
}

export default CovidVisualizer;