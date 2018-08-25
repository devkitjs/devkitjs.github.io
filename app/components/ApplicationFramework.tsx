import React, { Component, ReactNode } from 'react';

import { Follow } from 'react-twitter-widgets';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';


import './ApplicationFramework.less';

import TerminalPromptImage from './../assets/terminal-prompt.svg';

type ApplicationFrameworkState = {
    displayMode: string,
    toolsAndTechnologies: Array<{key: string, name: string, selectionState: string, dependencies: string[], duration: number}>
};

const alternativeDisplayMode = {
    fullscreen: 'collapsed',
    collapsed: 'fullscreen'
};

const supportedToolsAndTechnologies = {
    git: {
        name: 'Git',
        description: 'Doing git...'
    },
    node: {
        name: 'NodeJs',
        description: 'Doing Node...'
    },
    babel: { 
        name: 'Babel',
        description: 'Doing Babel...',
        dependencies: ['node']
    },
    reactJs: { 
        name: 'ReactJs',
        description: 'Doing ReactJs...',
        dependencies: ['node']
    },
    grunt: { 
        name: 'Grunt',
        description: 'Doing Grunt...',
        dependencies: ['node']
    },
    express: { 
        name: 'Express',
        description: 'Doing Express...',
        dependencies: ['node']
    }
};

class ApplicationFramework extends Component<{}, ApplicationFrameworkState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            displayMode: 'collapsed',
            toolsAndTechnologies: Object.keys(supportedToolsAndTechnologies).map( key => ({ ...supportedToolsAndTechnologies[key], key, selectionState: 'none' }))
        };
    }

    componentDidMount() {
        document.title = 'devkitjs';
    }

    private toggleDisplayMode(): void {
        this.setState({ displayMode: alternativeDisplayMode[this.state.displayMode] });
    }

    private toggleToolOrTechnologySelector(key: string): void {
        console.log(`toggleToolOrTechnologySelector, key = ${key}`);

        this.setState(s => { 
            var item = s.toolsAndTechnologies.find(i => i.key === key);

            if (item.selectionState === 'none') {
                item.selectionState = 'selected';
            } else {
                if (item.selectionState === 'selected') {
                    item.selectionState = 'none';
                }
            }

            return s;
         });
    }

    render() {
        return (
            <div className='application-framework'>

                <div className="title">
                    devkitjs
                </div>
                <div className="sub-title">
                    A tool that does all routine work configuring your Node.js development environment while you can focus on what really matters.
                </div>
                <div>
                    <Follow username="devkitjs" options={{ size: "large", showCount: false }} />
                </div>
                <div className="demo-overlay-outer" data-display-mode={ this.state.displayMode } >
                    <div className="demo-overlay-inner">
                        <div className="demo-overlay-content">
                            <div className="demo-overlay-content-inner">
                                <div className="tools-and-technologies-selector">
                                    {
                                        this.state.toolsAndTechnologies.map(item => (
                                            <div className="" data-selection-state={ item.selectionState } onClick={ e => this.toggleToolOrTechnologySelector(item.key) } key={item.key}>
                                                { item.name }
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="demo-buttons">
                                    <div className="start-demo-button">
                                        Start demo
                                    </div>
                                </div>
                                <div className="terminals">
                                    <div className="terminal-section devkit-terminal-section">
                                        <div className="terminal-window">
                                            <div className="frame">
                                                <div className="button button-1">

                                                </div>
                                                <div className="button button-2">

                                                </div>
                                                <div className="button button-3">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="terminal-section regular-terminal-section">
                                        <div className="terminal-window">
                                            <div className="frame">
                                                <div className="button button-1">

                                                </div>
                                                <div className="button button-2">

                                                </div>
                                                <div className="button button-3">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="demo-overlay-cursor-surface" onClick={ e => this.toggleDisplayMode() }>
   
                    </div>
                </div>

                <a href="https://github.com/devkitjs">
                    <img 
                        style={{position: 'absolute', top: 0, right: 0, border: 0}}
                        src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png" 
                        alt="Fork me on GitHub"/>
                </a>

                <div className="terminal-prompt">
                    <TerminalPromptImage />
                </div>
            </div>
        );
    }
}

export default ApplicationFramework;