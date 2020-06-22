import React, { Component } from 'react';
import './App.scss';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import routes from './Config/routes';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
// import Menu from './components/Menu/Menu';
import Menu2 from './components/Menu/Menu2';
import './custom.scss';
import { Col, Container, Row } from 'react-bootstrap'
import { faEye, faEyeSlash, faShoppingCart, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faEye, faEyeSlash, faShoppingCart, faFileAlt)


class App extends Component {
    render() {
        // require('bootstrap') 
        return (
            <Router>
                {/* <Menu /> */}
                {/* <div>
                    <div className="container">
                        <div className="row">
                            {this.showContentMenus(routes)}
                        </div>
                    </div>
                </div> */}
                <div>
                <Container fluid>
                    <Row>
                    <Col md={12} ><Menu2 /></Col>
                    <Col md={12} > {this.showContentMenus(routes)}</Col>
                    </Row>
                </Container>
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
