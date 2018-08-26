import React, { Component, ReactNode } from 'react';

class ApplicationOverlay extends Component {
    render(): ReactNode {
        return (
            <a href="https://github.com/devkitjs">
                <img 
                    style={{position: 'absolute', top: 0, right: 0, border: 0}}
                    src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png" 
                    alt="Fork me on GitHub" />
            </a>
        );
    }
}

export default ApplicationOverlay;