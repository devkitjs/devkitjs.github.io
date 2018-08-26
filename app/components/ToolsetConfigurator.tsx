import React, { Component, ReactNode } from 'react';

//  Styles
import './ToolsetConfigurator.less';

enum ToolState {
    SELECTED = 'selected',
    DEPENDENCY = 'dependency'
}

type ToolDescriptor = {
    id: string;
    name: string;
    description: string;
    primaryCategory: string;
};

type ToolCategoryDescriptor = {
    id: string;
    name: string;
};

type ToolsetConfiguratorProperties = {
    tools: ToolDescriptor[];
    categories: ToolCategoryDescriptor[];
    onSelectionChanged?: (selection: { [key: string]: ToolState }) => void;
}

type ToolsetConfiguratorState = {
    toolSelection: {
        [key: string]: ToolState;
    }
}

class ToolsetConfigurator extends Component<ToolsetConfiguratorProperties, ToolsetConfiguratorState> {
    constructor(props: ToolsetConfiguratorProperties) {
        super(props);

        this.state = {
            toolSelection: {

            }
        }
    }

    private _toggleToolSelection(toolId: string) {
        console.log(`Toggle tool selection, toolId = ${toolId}`);

        this.setState(state => {
            var toolSelection = state.toolSelection;

            if (toolSelection[toolId] === undefined) {
                toolSelection[toolId] = ToolState.SELECTED;
            } else {
                if (toolSelection[toolId] == ToolState.SELECTED)  {
                    toolSelection[toolId] = undefined;
                }
            }

            if (this.props.onSelectionChanged) {
                this.props.onSelectionChanged(toolSelection);
            }

            return { toolSelection };
        });
    }

    render(): ReactNode {
        const numberOfSelectedTools = Object.keys(this.state.toolSelection).reduce((p, k, i) => (this.state.toolSelection[k] ? p + 1 : p), 0);

        return (
            <div className="toolset-configurator">
                <div>
                    {
                        this.props.categories.map(category => (
                            <div className="toolset-configurator__category" key={ category.id }>
                                <div className="toolset-configurator__category__header">
                                    { category.name }
                                </div>
                                <div className="toolset-configurator__category__body">
                                    { this.props.tools.filter(tool => tool.primaryCategory === category.id ).map(tool => (
                                        <div className="button" 
                                            onClick={ () => this._toggleToolSelection(tool.id) } 
                                            data-state={ this.state.toolSelection[tool.id] } 
                                            key={ tool.id }>
                                            <div className="selection">
                                            
                                            </div>
                                            <div className="label">
                                                { tool.name } 
                                            </div>
                                        </div>
                                    )) }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="tools-counter" style={{ visibility: numberOfSelectedTools > 0 ? 'visible' : 'hidden' }}>
                    { `${ numberOfSelectedTools } tool${ numberOfSelectedTools > 1 ? 's' : '' } selected` }
                </div>
            </div>
        );
    }
}

export default ToolsetConfigurator;
export { ToolState, ToolDescriptor, ToolCategoryDescriptor };