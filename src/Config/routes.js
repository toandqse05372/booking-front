import React from 'react';
import LoginPage from './../pages/login/LoginPage';
import HomePage from './../pages/HomePage/HomePage';
import Register from './../pages/login/Register';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ParkList from '../pages/ParkList/ParkList';
import ParkListSearched from '../pages/ParkListSearched/ParkListSearched';


const routers = [
    {
        path: '/login',
        exact: false,
        main: ({ history }) => <LoginPage history={history} />
    },
    {
        path: '/register',
        exact: false,
        main: ({ history }) => <Register history={history} />
    },
    {
        path: '/NotFound',
        exact: false,
        main: ({ history }) => <NotFoundPage history={history} />
    },
    {
        path: '/listPark',
        exact: false,
        main: ({ history }) => <ParkList history={history} />
    },
    {
        path: '/listParkSearched',
        exact: false,
        main: ({ history }) => <ParkListSearched history={history} />
    },
    {
        path: '/',
        exact: true,
        main: () => <HomePage />  //component tuong ung
    }
];
export default routers;