import React, {Component} from 'react';
import {EuiIcon, EuiSideNav} from '@elastic/eui';

class SidebarNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSideNavOpenOnMobile: false,
            selectedItemName: 'Lion stuff',
        };
    }

    toggleOpenOnMobile = () => {
        this.setState({
            isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
        });
    };

    render() {
        const sideNavNew = [
            {
                name: 'Covid Visualizer',
                icon: <EuiIcon type="visLine"/>,
                href:'#/',
                id: 0,
                items: [
                    {
                        name: 'Latest Update',
                        id: 1,
                        href: '#/latest-update',
                    },
                    {
                        name: 'Graphs',
                        href: '#/graphs',
                        id: 2,
                    },
                    {
                        name: 'Sate wise data',
                        id: 4,
                        href: '#/states',
                    },

                ],
            },

        ];


        return (
            <EuiSideNav
                mobileTitle="Covid Visualizer"
                toggleOpenOnMobile={this.toggleOpenOnMobile}
                isOpenOnMobile={this.state.isSideNavOpenOnMobile}
                items={sideNavNew}
                style={{width: 192}}
            />
        );
    }
}

export default SidebarNav;