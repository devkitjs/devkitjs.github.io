import React from 'react';
import ReactDOM from 'react-dom';

import ApplicationFramework from './components/ApplicationFramework';

import { HashRouter, Route, Link } from 'react-router-dom';

const Layout = (pros) => (
    <HashRouter>
        <ApplicationFramework />
    </HashRouter>
)

ReactDOM.render(<Layout />, document.getElementById('application-framework-container'));