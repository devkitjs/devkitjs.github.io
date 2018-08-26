import React, { Component, ReactNode } from 'react';

import { Follow } from 'react-twitter-widgets';

import './MainView.less';

class MainView extends Component {
    render(): ReactNode {
        return (
            <div className="main-view">
                <div className="title">
                    devkitjs
                </div>
                <div className="sub-title">
                    A tool that does all routine work configuring your Node.js development environment while you can focus on what really matters.
                </div>
                <div>
                    <Follow username="devkitjs" options={{ size: "large", showCount: false }} />
                </div>
            </div>
        );
    }
}

export default MainView;