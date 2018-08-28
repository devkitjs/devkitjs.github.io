import React, { Component, ReactNode } from 'react';

//  Styles
import './DemoViewPageSection.less';

type DemoViewPageProperties = {
    title: string;
}

class DemoViewPageSection extends Component<DemoViewPageProperties> {

    render(): ReactNode {
        return (
            <div className="demo-view-page-section">
                <div className="demo-view-page-section__header">
                    { this.props.title }
                </div>
                <div className="demo-view-page-section__body">
                    <div>
                        { this.props.children }
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default DemoViewPageSection;