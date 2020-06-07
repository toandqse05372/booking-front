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
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faEye, faEyeSlash, faShoppingCart, faFileAlt)


class App extends Component {
    render() {
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

                {/* <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
                    <div class="container">
                        <a class="navbar-brand" href="/#">Goboki</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item active">
                                    <a class="nav-link" href="/#">Home
                                        <span class="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#">Services</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <header class="masthead">
                    <div class="container h-100">
                        <div class="row h-100 align-items-center">
                            <div class="col-12 text-center">
                                <h1 class="font-weight-light">Vertically Centered Masthead Content</h1>
                                <p class="lead">A great starter layout for a landing page</p>
                            </div>
                        </div>
                    </div>
                </header>

                <section class="py-5">
                    <div class="container">
                        <h2 class="font-weight-light">Page Content</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus ab nulla dolorum autem nisi officiis blanditiis voluptatem hic, assumenda aspernatur facere ipsam nemo ratione cumque magnam enim fugiat reprehenderit expedita.</p>
                    </div>
                </section> */}



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
