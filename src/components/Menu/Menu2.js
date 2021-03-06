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
import { connect } from 'react-redux';

const menus = [
    {
        name: 'Booking Page',
        to: '/bookingPage2',
        exact: false,
        trans: 'tpayment',
        id: 'bookbtn'
    },
    {
        name: 'Đặt chỗ của tôi',
        to: '/cart',
        exact: false,
        // icon: 'file-alt',
        trans: 'tBook',
        id: 'bookbtn'
    },
    // {
    //     name: 'Giỏ hàng',
    //     to: '/notFound',
    //     exact: false,
    //     // icon: 'shopping-cart',
    //     trans: 'tCart',
    //     id: 'cartbtn'
    // },
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

const MenuLink = ({ label, to, activeOnlyWhenExact, id }) => {
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
    logOut = () => {
        localStorage.removeItem('tokenLogin');
        localStorage.removeItem('USER');
        localStorage.removeItem('CART');
        window.location.reload();
        // this.props.history.push("/");
    }

    render() {
        var { dropTrans } = this.state;
        const { UserDetail } = this.props;
        return (
            <div>
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
                    <span><h1>{UserDetail.firstName?UserDetail.firstName:UserDetail.name}</h1></span>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {dropTrans.map((data, index) => {
                                return (

                                    <NavDropdown className="dropbtn"
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
                            <button id="loginbtn" onClick={this.logOut}>Logout</button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
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
                    } else
                        if (trans === "tpayment") {
                            return "Booking Page"
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

const mapStateToProps = state => {
    return {
        UserDetail: state.User,
    }
};

// export default withTranslation()(Menu2);
export default connect(mapStateToProps, null)(withTranslation()(Menu2));
