import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import ReactCountryFlag from "react-country-flag"
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import {
    Form, Navbar, Button, Nav,
    NavDropdown, FormControl
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const menus = [
    {
        name: 'Trang chu',
        to: '/',
        exact: true
    },
    {
        name: 'Login',
        to: '/login',
        exact: false
    },
    {
        name: 'Register',
        to: '/register',
        exact: false
    },
    // {
    //     name: 'Register with validation',
    //     to: '/register2',
    //     exact: false
    // },
    // {
    //     name: 'show/hide',
    //     to: '/register3',
    //     exact: false
    // }
];
const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link className="nav-link" to={to}>
                            {label}
                        </Link>
                        {/* <Nav.Link href={to}>
                            {label}
                        </Nav.Link> */}
                    </li>

                );
            }}
        />
    )
}

class Menu2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameDropDown: 'en',
            countryCode: 'US'
        }
    }
    handleClick(lang, countryCode) {
        i18next.changeLanguage(lang)
        this.setState({
            nameDropDown: lang,
            countryCode: countryCode
        });
    }
    render() {
        const  {t}  = this.props;
        

        var { nameDropDown, countryCode } = this.state;
        return (
            <Navbar bg="primary" variant="dark" expand="lg">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="/logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    Goboki
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {this.showMenus(menus)}
                        {/* <Nav.Link href="#link">Link</Nav.Link> */}
                        <NavDropdown 
                        // title = {nameDropDown}
                        title=  
                        {<ReactCountryFlag countryCode={countryCode} svg />}
                        // {nameDropDown}
                        id="basic-nav-dropdown">
                            <NavDropdown.Item
                                // href="#action/3.1"
                                onClick={() => this.handleClick('en', 'US')} >
                                <ReactCountryFlag countryCode="US" svg />
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                // href="#action/3.2"
                                onClick={() => this.handleClick('jap', 'JP')}>
                                <ReactCountryFlag countryCode="JP" svg />
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                // href="#action/3.3"
                                onClick={() => this.handleClick('vi', 'VN')}>
                                <ReactCountryFlag countryCode="VN" svg />
                                </NavDropdown.Item>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    showMenus = (theMenus) => {
        var result = null;
        if (theMenus.length > 0) {
            result = theMenus.map((menu, index) => {
                return (
                    // <Nav.Link
                    //     key={index}
                    //     href={menu.to}>
                    //     {menu.name}
                    // </Nav.Link>
                    <MenuLink
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            });
        }
        return result;
    }
}

export default withTranslation()(Menu2);
