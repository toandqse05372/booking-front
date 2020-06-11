import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ReactCountryFlag from "react-country-flag"
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import {
    Navbar, Nav,
    NavDropdown,
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const menus = [
    {
        name: 'Đặt chỗ của tôi',
        to: '/NotFound',
        exact: false,
        // icon: 'file-alt',
        trans: 'tBook',
        id: 'bookbtn'
    },
    {
        name: 'Giỏ hàng',
        to: '/NotFound',
        exact: false,
        // icon: 'shopping-cart',
        trans: 'tCart',
        id: 'cartbtn'
    },
    {
        name: 'Đăng nhập',
        to: '/login',
        exact: false,
        trans: 'tLogin',
        id: 'loginbtn'
    },
    {
        name: 'Đăng kí',
        to: '/register',
        exact: false,
        trans: 'tRegister',
        id: 'registerbtn'
    }
];

// const MenuLink = ({ label, to, activeOnlyWhenExact, icon, id }) => {
    
const MenuLink = ({ label, to, activeOnlyWhenExact,  id }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link className="nav-link"
                            id={id}
                            to={to}>
                            {/* <FontAwesomeIcon icon={icon} /> */}
                            {' '}
                            {label}
                        </Link>
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
            ],
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
        // const { test } = this.state;
        // localStorage.setItem('dropTrans', JSON.stringify(test));

        // var dropTrans = JSON.parse(localStorage.getItem('dropTrans'));
        // console.log(dropTrans);
        // this.setState({
        //     dropTrans: dropTrans
        // });
    }


    render() {
        var { dropTrans } = this.state;
        return (
            <Navbar
                sticky="top"
                bg="white"
                variant="light"
                expand="lg">
                <Link to='/'>
                    <Navbar.Brand >
                        <img
                            alt="NOT FOUND"
                            src="/logo512.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"

                        />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {dropTrans.map((data, index) => {
                            return (
                                <NavDropdown className="dropbtn"
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
                                // id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item id="boxSizing"
                                        // href="#action/3.1"
                                        onClick={() => this.handleClick('en', 'US')} >
                                        <ReactCountryFlag countryCode="US" svg /> English(US)
                                    </NavDropdown.Item>
                                    {/* <NavDropdown.Divider /> */}
                                    <NavDropdown.Item id="boxSizing"
                                        // href="#action/3.2"
                                        onClick={() => this.handleClick('jap', 'JP')}>
                                        <ReactCountryFlag countryCode="JP" svg /> Japanese
                                    </NavDropdown.Item>
                                    {/* <NavDropdown.Divider /> */}
                                    <NavDropdown.Item id="boxSizing"
                                        onClick={() => this.handleClick('vi', 'VN')}>
                                        <ReactCountryFlag countryCode="VN" svg /> Vietnamese
                                    </NavDropdown.Item>
                                </NavDropdown>
                            );
                        })}
                        {this.showMenus(menus)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    // render() {
    //     return (
    //         <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
    //             <div className="container">
                    
    //                 <a className="navbar-brand" href="/#">Goboki</a>
                    
    //                 <button className="navbar-toggler" type="button" 
    //                 data-toggle="collapse" data-target="#navbarResponsive" 
    //                 aria-controls="navbarResponsive" aria-expanded="false" 
    //                 aria-label="Toggle navigation">
    //                     <span className="navbar-toggler-icon"></span>
    //                 </button>
    //                 <div className="collapse navbar-collapse" id="navbarResponsive">
    //                     <ul className="navbar-nav ml-auto">
    //                         <li className="nav-item active">
    //                             <a className="nav-link" href="/#">Home
                            
    //                             </a>
    //                         </li>
    //                         <li className="nav-item">
    //                             <a className="nav-link" href="/#">About</a>
    //                         </li>
    //                         <li className="nav-item">
    //                             <a className="nav-link" href="/#">Services</a>
    //                         </li>
    //                         <li className="nav-item">
    //                             <a className="nav-link" href="/#">Contact</a>
    //                         </li>
    //                     </ul>
    //                 </div>
    //             </div>
    //         </nav>
    //     )
    // }

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
        if (theMenus.length > 0) {
            result = theMenus.map((menu, index) => {
                const nameTrans = this.hmm(menu.trans);
                return (
                    <MenuLink
                        id={menu.id}
                        key={index}
                        label={nameTrans}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                        // icon={menu.icon}
                    />
                );
            });
        }
        return result;
    }

}

export default withTranslation()(Menu2);
