import React, { Component, ReactNode } from 'react';

import { HashRouter, Route, Link } from 'react-router-dom';

import Rx from 'rx';

import MainView from './MainView';
import DemoView from './DemoView';
import ViewToggle from './ViewToggle';

import ApplicationOverlay from './ApplicationOverlay';

import ToolsCatalogue from '../config/ToolsCatalogue';

import './ApplicationFramework.less';

import ReactGA from 'react-ga';

ReactGA.initialize('UA-124748437-1');
ReactGA.pageview(window.location.pathname + window.location.search);

//  Configuration
import tools from '../config/ToolsCatalogue';

type ApplicationFrameworkState = {
    demoOn?: boolean;
    toolsAndTechnologies?: Array<{key: string, name: string, selectionState: string, dependencies: string[], duration: number}>;
    terminalIOStream?: Rx.Observable<string>;
};

const SAMPLE_LINES = [
    'yarn add --dev @babel/code @babel/cli @babel/typescript',
    'yarn add --dev grunt grunt-typescript', 
    'yarn add react react-dom'
];

const WAVE_PARAMETERS = [
    {
        duration: '6s',
        delay: '2s',
        width: '3px',
        color: '#580063'
    },
    {
        duration: '4s',
        delay: '0s',
        width: '3px',
        color: '#580063'
    },
    {
        duration: '7s',
        delay: '1s',
        width: '3px',
        color: '#580063'
    },
    {
        duration: '5s',
        delay: '3s',
        width: '3px',
        color: '#580063'
    }
];

type ApplicationFrameworkProperties = {
    path?: string;
}

class ApplicationFramework extends Component<ApplicationFrameworkProperties, ApplicationFrameworkState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            demoOn: false,
            toolsAndTechnologies: [],//Object.keys(ToolsAndTechnologies).map( key => ({ ...ToolsAndTechnologies[key], key, selectionState: 'none' })),
            terminalIOStream: null
        };
    }

    componentDidMount() {
        document.title = 'devkitjs';
    }

    _toggleView(): void {
        console.log('Toggle view');

        this.setState(state => ({ demoOn: !state.demoOn }));
    }

    render() {
        console.log('Render ApplicationFramework');

        return (
            <div className='application-framework'>
            
                <MainView />

                <Route exact path="/demo" render={() => <DemoView 
                    tools={ ToolsCatalogue.tools }
                    toolCategories={ ToolsCatalogue.categories } /> } />
                
                <Route path="/" render={ props => <ViewToggle 
                    radiation={{ 
                        enabled: props.location.pathname === '/',
                        waves: WAVE_PARAMETERS 
                    }} 
                    linkRoutePath={ props.location.pathname === '/' ? '/demo' : '/' }/> } />
                
                <ApplicationOverlay />
            </div>
        );
    }
}

export default ApplicationFramework;