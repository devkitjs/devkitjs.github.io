/**********************************************************************************************************************/
/*                                                  IMPORTS                                                           */
/**********************************************************************************************************************/

//  Node modules
import React, { Component, ReactNode } from 'react';
import Rx from 'rx';

//  Components
import TerminalSimulator from './TerminalSimulator';
import ToolsetConfigurator, { ToolState, ToolDescriptor, ToolCategoryDescriptor } from './ToolsetConfigurator';
import DemoViewPage from './DemoViewPage';
import DemoViewPageSection from './DemoViewPageSection';

//  Styles
import './DemoView.less';

const DEFAULT_ENTRY_ANIMATION_DURATION_SEC = 1;

enum DemoFrameMode {
    collapsed,
    expanded
}

type DemoViewProperties = {
    tools?: ToolDescriptor[];
    toolCategories?: ToolCategoryDescriptor[];
    entryAnimationDurationSec?: number;
};

type Tool = {
    state: ToolState;
    descriptor: ToolDescriptor;
}

type DemoViewState = {
    mode: DemoFrameMode;
    toolStates: {
        [key: string]: ToolState
    };
    toolCategories: ToolCategoryDescriptor[];
    numberOfSelectedTools: number;
    currentPage: number;
};

const alternativeDisplayMode = {
    expanded: 'collapsed',
    collapsed: 'expanded'
};

class DemoView extends Component<DemoViewProperties, DemoViewState> {
    constructor(props: DemoViewProperties) {
        super(props);

        this.state = {
            mode: DemoFrameMode.collapsed,
            toolCategories: props.toolCategories,
            toolStates: (props.tools || []).reduce((p, c) => { p[c.id] = undefined; return p; }, {} ),
            numberOfSelectedTools: 0,
            currentPage: 1
        }
    }

    private _getEntryAnimationDuration(): string {
         return (this.props.entryAnimationDurationSec || DEFAULT_ENTRY_ANIMATION_DURATION_SEC) + 's';
    }

    private _getEntryAnimationDurationHalf(): string {
        return (this.props.entryAnimationDurationSec || DEFAULT_ENTRY_ANIMATION_DURATION_SEC) / 2 + 's';
   }

    private _startDemo(): void {
        console.log(`Starting demo...`);

        this.setState({ currentPage: 2 });

        // this.setState(state => ({ terminalIOStream: Rx.Observable.fromArray(SAMPLE_LINES)
        //     .map(value => Rx.Observable.return(value).delay(2000 + Math.random() * 500 - 250))
        //     .concatAll()
        // }));

        window.addEventListener('wheel', e => console.log('scroll'));
    }

    private toggleDisplayMode(): void {
        this.setState({ mode: alternativeDisplayMode[this.state.mode] });
    }

    private _toggleToolState(state: ToolState): ToolState {
        if (state === undefined) {
            return ToolState.SELECTED;
        } else {
            if (state === ToolState.SELECTED) {
                return undefined;
            }
        }

        return state;
    }

    private _toolSelection: { [key: string]: ToolState };

    private toggleToolSelector(id: string): void {
        this.setState(s => ({
            toolStates: { ...s.toolStates, id: this._toggleToolState(s.toolStates[id])}
         }));
    }

    private _updateToolSelection(selection: { [key: string]: ToolState }) {
        this._toolSelection = selection;

        this.setState({ numberOfSelectedTools: Object.keys(selection).reduce((p, k, i) => (selection[k] ? p + 1 : p), 0) });
    }

    render(): ReactNode {
        return (
            <div className="demo-view">
                <div className="demo-view__background" 
                    style={{ animationDuration: this._getEntryAnimationDuration() }} >
                </div>

                <div className="demo-view__header">
                    devkitjs live demo
                </div>

                <div className="demo-view__body"
                    style={{ animationDelay: this._getEntryAnimationDurationHalf() }} >
                    <div className="demo-view__page-selector" data-page={ this.state.currentPage }>
                        <DemoViewPage>
                            <DemoViewPageSection title="Step 1. Select tools that you usually use in projects" >
                                <ToolsetConfigurator 
                                    tools={ this.props.tools }
                                    categories={ this.props.toolCategories }
                                    onSelectionChanged={ selection => this._updateToolSelection(selection) }  />
                                <div className="start-demo-button-panel">
                                    <div className="start-demo-button" 
                                        data-enabled={ this.state.numberOfSelectedTools > 0 }
                                        onClick={ () => this.state.numberOfSelectedTools > 0 && this._startDemo() } 
                                    >
                                        Show me the demo
                                    </div>
                                </div>
                            </DemoViewPageSection>
                        </DemoViewPage>
                        <DemoViewPage>
                            <DemoViewPageSection title="Step 2. Scroll down to see how devkitjs compares to a traditional approach" >
                                {/* <div className="scrollDownButton">
                                
                                </div> */}
                                <div className="demo-view__simulators-panel">
                                    <TerminalSimulator width='40%' height='50vh' />
                                    <TerminalSimulator width='40%' height='50vh'  />
                                </div>
                            </DemoViewPageSection>
                        </DemoViewPage>
                    </div>
                </div>
            </div>
        );
    }
}

export default DemoView;