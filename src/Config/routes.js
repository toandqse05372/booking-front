import React from 'react';
import LoginPage from './../pages/login/LoginPage';
import HomePage from './../pages/HomePage/HomePage';
import Register from './../pages/login/Register';
import RegisterCopy from '../pages/login/Register copy';
import LoginTest from '../pages/login/LoginTest';


const routers = [
    {
        path :'/login',
        exact: false,
        main: ({history}) => <LoginPage history={history}/>
    },
    {
        path :'/register',
        exact: false,
        main: ({history}) => <Register history={history}/>
    },
    {
        path :'/register2',
        exact: false,
        main: ({history}) => <RegisterCopy history={history}/>
    },
    {
        path :'/register3',
        exact: false,
        main: ({history}) => <LoginTest history={history}/>
    },
    {
        path: '/',
        exact: true,
        main: () => <HomePage />  //component tuong ung
    }
];
export default routers;