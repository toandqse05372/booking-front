import React from 'react';
import LoginPage from './../pages/login/LoginPage';
import Register from './../pages/login/Register';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ParkList from '../pages/ParkList/ParkList';
import ParkListSearched from '../pages/ParkListSearched/ParkListSearched';
import HomePage from '../pages/HomePage/HomePage/HomePage';
import ParkDetail from '../pages/Detail/ParkDetail/ParkDetail';
import Payment from '../pages/Payment/Payment';
import AnotherOne from '../pages/Payment/AnotherOne';
import Cart from '../pages/Cart/Cart';
import Payment2 from '../pages/Payment/Payment2';
import Payment3 from '../pages/Payment/NewPayment/Payment3';


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
        path: '/ParkDetail',
        exact: false,
        main: ({ history }) => <ParkDetail history={history} />
    },
    {
        path: '/',
        exact: true,
        main: () => <HomePage />  //component tuong ung
    },
    {
        path: '/payment',
        exact: true,
        main: ({ history,location }) => <Payment history={history} location={location} />  
    },
    {
        path: '/BookingPage2',
        exact: true,
        main: () => <AnotherOne />  
    },
    {
        path: '/Cart',
        exact: true,
        main: () => <Cart />  
    },
    {
        path: '/payment2',
        exact: true,
        main: () => <Payment2 />  
    },
    {
        path: '/newPayment',
        exact: true,
        main: () => <Payment3 />  
    },
    {
        path: '',
        exact: true,
        main: () => <NotFoundPage />  
    }
];
export default routers;