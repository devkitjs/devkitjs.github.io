import React, { Component, ReactNode } from 'react';
import Rx from 'rx';

import './TerminalSimulator.less';

type TerminalSimulatorStyle = {

}

type TerminalSimulatorTheme = {

}

enum DataDirection {
    input,
    output
}

type TerminalData<T> = {
    direction: DataDirection;
    data: T;
}

type TerminalSimulatorState = {
    ioData: string[];
}

type TerminalSimulatorProperties = {
    style?: string | TerminalSimulatorStyle;
    theme?: string | TerminalSimulatorTheme;
    width?: string;
    height?: string;
    prompt?: string;
    ioStream?: Rx.Observable<string> | Rx.Observable<Rx.Observable<string>>;
}

const DEFAULT_WIDTH = '100%';
const DEFAULT_HEIGHT = '300px';
const DEFAULT_STYLE = 'macos';
const DEFAULT_THEME = 'default';

const SUPPORTED_STYLES = {
    macos: {

    }
}

class TerminalSimulator extends Component<TerminalSimulatorProperties, TerminalSimulatorState> {
    constructor(props: TerminalSimulatorProperties) {
        super(props);

        this.state = {
            ioData: []
        };

        if (props.style && !(props.style in SUPPORTED_STYLES)) {
            throw Error(`Style '${props.style}' is not supported.`);
        }
    }

    componentWillReceiveProps(nextProps: TerminalSimulatorProperties): void {
        if (nextProps.ioStream !== this.props.ioStream) {
            console.log('io stream changed');

            this._resetIoStream();

            if (nextProps.ioStream) {
                // nextProps.ioStream.subscribe(io => {
                    
                // });
            }
        }
    }

    private _resetIoStream(): void {
        if (this._ioStreamSubscription) {
            this._ioStreamSubscription.dispose();
            this._ioStreamSubscription = null;

            this.setState({ ioData: [] });
        }
    }


    private _nextLineNumber: number = 0;
    private _ioStreamSubscription: Rx.IDisposable;

    render(): ReactNode {  
        return (
            <div className="terminal-simulator" 
                style={{ width: this.props.width || DEFAULT_WIDTH, height: this.props.height || DEFAULT_HEIGHT }}
                data-style={ this.props.style || DEFAULT_STYLE }
                data-theme={ this.props.theme || DEFAULT_THEME } >
                <div className="terminal-simulator__window">
                    <div className="terminal-simulator__window__frame">
                        { [...Array(3).keys()].map(i => <div className="terminal-simulator__window__frame__button" key={ i }></div>) }
                    </div>
                    <div className="terminal-simulator__window__body">
                        { this.state.ioData.map(line => <p key={ this._nextLineNumber++ }>{ line }</p>) }
                    </div>
                </div>
            </div>
        );
    }
}

export default TerminalSimulator;

export { TerminalSimulator };