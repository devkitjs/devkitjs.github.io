//  Node modules
import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

//  Styles
import './ViewToggle.less';

//  Assets
import TerminalPromptImage from './../assets/terminal-prompt.svg';

enum ViewType {
    main,
    demo
}

type ViewToggleState = {
    viewType: ViewType;
}

type RadiationWaveParameters = {
    duration: string;
    delay: string;
    width: string;
    color: string;
}

type ViewToggleProperties = {
    radiation?: { 
        enabled?: boolean;
        waves: RadiationWaveParameters[];
    };
    linkRoutePath: string;
}

class ViewToggle extends Component<ViewToggleProperties, ViewToggleState> {
    constructor(props: ViewToggleProperties) {
        super(props);

        this.state = {
            viewType: ViewType.main
        }
    }

    render(): ReactNode {
        //console.log(`Location: ${this.props.location.pathname}`);

        return (
            <div className="view-toggle" >
                {
                    this.props.radiation && this.props.radiation.enabled ? (
                        <div className="radiation">
                        {
                            this.props.radiation.waves.map((wave, index) => <div 
                                className="radiation-wave" 
                                style={{ 
                                    animationDuration: wave.duration, 
                                    animationDelay: wave.delay, 
                                    borderColor: wave.color,
                                    borderWidth: wave.width
                                }}
                                key={ index } />
                            )
                        }
                    </div>
                    ) : null
                }

                <Link className={ "surface" + (this.props.radiation && this.props.radiation.enabled  ? "" : " no-border") } 
                    to={{ pathname: this.props.linkRoutePath }} >
                        <div className="terminal-prompt">
                            <TerminalPromptImage /> 
                        </div>
                </Link>
            </div>
        );  
    }
}

export default ViewToggle;