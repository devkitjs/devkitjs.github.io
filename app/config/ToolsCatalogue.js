export default {
    categories: [
        {
            id: 'source_control',
            name: 'Source control'
        },
        {
            id: 'runtimes',
            name: 'Runtimes'
        },
        {
            id: 'build_automation',
            name: 'Build automation'
        },
        {
            id: 'web',
            name: 'Web applications'
        },
        {
            id: 'miscellaneous',
            name: 'Miscellaneous'
        }
    ],
    tools: [
        {
            id: 'git',
            name: 'Git',
            description: 'Doing git...',
            primaryCategory: 'source_control'
        },
        {
            id: 'node',
            name: 'NodeJs',
            description: 'Doing Node...',
            primaryCategory: 'runtimes'
        },
        { 
            id: 'babel',
            name: 'Babel',
            description: 'Doing Babel...',
            dependencies: ['node'],
            primaryCategory: 'miscellaneous'
        },
        { 
            id: 'reactJs',
            name: 'ReactJs',
            description: 'Doing ReactJs...',
            dependencies: ['node'],
            primaryCategory: 'web'
        },
        { 
            id: 'grunt',
            name: 'Grunt',
            description: 'Doing Grunt...',
            dependencies: ['node'],
            primaryCategory: 'build_automation'
        },
        { 
            id: 'gulp',
            name: 'Gulp',
            description: 'Doing Gulp...',
            dependencies: ['node'],
            primaryCategory: 'build_automation'
        },
        { 
            id: 'express',
            name: 'Express',
            description: 'Doing Express...',
            dependencies: ['node'],
            primaryCategory: 'web'
        }
    ]
};