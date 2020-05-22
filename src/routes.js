import React from 'react';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/HomePage/HomePage';

const routers = [
    {
        path :'/login',
        exact: false,
        main: ({history}) => <LoginPage history={history}/>
    },
    {
        path: '/',
        exact: true,
        main: () => <HomePage />  //component tuong ung
    }
];
export default routers;