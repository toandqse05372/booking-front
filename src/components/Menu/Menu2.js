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
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardText } from 'react-bootstrap/Card';

const menus = [
    // {
    //     name: 'Trang chu',
    //     to: '/',
    //     exact: true
    // },

    {
        name: 'Đặt chỗ của tôi',
        to: '/NotFound',
        exact: false,
        icon: 'file-alt',
        trans: 'tBook'
    },
    {
        name: 'Giỏ hàng',
        to: '/NotFound',
        exact: false,
        icon: 'shopping-cart',
        trans: 'tCart'
    },
    {
        name: 'Đăng nhập',
        to: '/login',
        exact: false,
        trans: 'tLogin'
    },
    {
        name: 'Đăng kí',
        to: '/register',
        exact: false,
        trans: 'tRegister'
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

const MenuLink = ({ label, to, activeOnlyWhenExact, icon }) => {

    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {

                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link className="nav-link" to={to}>
                            {/* <FontAwesomeIcon icon={icon} />  */}
                            {label}
                        </Link>
                        {/* t('MyOrder.1') */}

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
            dropTrans: [
                {
                    nameDropDown: 'en',
                    countryCode: 'US'
                }
            ]

        }
    }
    handleClick(lang, countryCode) {
        i18next.changeLanguage(lang)
        var dropTrans = [
            {
                nameDropDown: lang,
                countryCode: countryCode
            }
        ]
        this.setState({
            dropTrans: dropTrans
        });
        localStorage.setItem('dropTrans', JSON.stringify(dropTrans));
    }

    componentWillMount() {
        var dropTrans = JSON.parse(localStorage.getItem('dropTrans'));
        this.setState({
            dropTrans: dropTrans
        });
    }

    // componentDidMount = (lang, countryCode) => {
    //     this.setState({
    //         nameDropDown: 'en',
    //         countryCode: 'US'
    //     });
    // }

    render() {
        // const { t } = this.props;
        // {t('Password.1')}
        var { dropTrans } = this.state;
        return (
            <Navbar className="fixed" bg="primary" variant="light" expand="lg">
                <Navbar.Brand href="/">
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
                    <Nav className="ml-auto">
                        {dropTrans.map((data, index) => {
                            return (
                                // {data.nameDropDown}
                                // {data.countryCode}
                                <NavDropdown
                                    // title = {nameDropDown}
                                    key={data.nameDropDown}
                                    title={<ReactCountryFlag
                                        countryCode={data.countryCode}
                                        svg
                                        style={{
                                            width: '2em',
                                            height: '2em',
                                        }}
                                        title="US"
                                    />} 
                                    // title = {data.nameDropDown}
                                    // {<ReactCountryFlag countryCode={dropTrans.countryCode} svg />}
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
                            );
                        })}

                        {this.showMenus(menus)}
                        {/* <FontAwesomeIcon icon="shopping-cart"/> */}
                        {/* <Nav.Link href="#link">Link</Nav.Link> */}

                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Navbar>
        );
    }

    hmm = (trans) => {
        const { t } = this.props;
        const order = t('MyOrder.1');
        const cart = t('MyCart.1');
        const login = t('Login.1');
        const register = t('Register.1');
        if (trans === "tBook") {
            return order;
        } else
            if (trans === "tCart") {
                return cart;
            } else
                if (trans === "tLogin") {
                    return login;
                } else
                    if (trans === "tRegister") {
                        return register;
                    }
        return trans;
    }

    showMenus = (theMenus) => {
        var result = null;
        // var pass = t('password.1');

        if (theMenus.length > 0) {
            result = theMenus.map((menu, index) => {
                const hehe = this.hmm(menu.trans);
                console.log(hehe);
                return (

                    <MenuLink
                        key={index}
                        // label={ menu.trans === 'book' ? order 
                        // : menu.name }

                        label={hehe}

                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                        icon={menu.icon}
                    />
                );
            });
        }
        return result;
    }

}

export default withTranslation()(Menu2);
