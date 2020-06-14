import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ReactCountryFlag from "react-country-flag"
import i18next from 'i18next';
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
    }
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
                        <Link to={to}>
                            {label}
                        </Link>
                    </li>
                );
            }}
        />
    )
}


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameDropDown: 'vi',
            countryCode: 'VN'
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
        var { nameDropDown, countryCode } = this.state;
        return (
            <div className="navbar navbar-default">
                <a className="navbar-brand" href="/#">Logo</a>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle"
                        type="button" data-toggle="dropdown">
                        {nameDropDown} <ReactCountryFlag countryCode={countryCode} svg />
                        <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        <li onClick={() => this.handleClick('en', 'US')}><ReactCountryFlag countryCode="US" svg />English</li>
                        <li onClick={() => this.handleClick('jap', 'JP')}><ReactCountryFlag countryCode="JP" svg />日本語</li>
                        <li onClick={() => this.handleClick('vi', 'VN')}><ReactCountryFlag countryCode="VN" svg />Vietnamese</li>
                    </ul>
                </div>
                <ul className="nav navbar-nav">
                    {this.showMenus(menus)}
                </ul>
            </div>
        );
    }

    showMenus = (menus) => {
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
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

export default Menu;
