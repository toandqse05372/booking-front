import React from 'react';
import LoginPage from './login/LoginPage';

const routers = [
    {
        path :'/login',
        exact: false,
        main: () => <LoginPage />
    },
];

export default routers;