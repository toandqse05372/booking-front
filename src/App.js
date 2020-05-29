import React, { Component } from 'react';
import './App.css';
import routes from './Config/routes';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Menu2 from './components/Menu/Menu2';
import {  faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(  faEye, faEyeSlash )

class App extends Component {
    render() {
        return (
            <Router>
                {/* <Menu /> */}
                <Menu2 />
                <div>
                    <div className="container">
                        <div className="row">
                            {this.showContentMenus(routes)}
                        </div>
                    </div>
                </div>
            </Router>
        );
    }

    showContentMenus = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (<Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                />
                );
            });
        }
        return <Switch>{result}</Switch>
    }

}
export default App;
