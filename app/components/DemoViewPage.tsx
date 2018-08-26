import React, { Component, ReactNode } from 'react';

//  Style
import './DemoViewPage.less';

class DemoViewPage extends Component {
    render(): ReactNode {
        return (
            <div className="demo-view-page">
                { this.props.children }
            </div>
        );
    }
}

export default DemoViewPage;