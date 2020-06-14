import React, { Component } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as paymentKey from './../../constants/paymentKey';
// import MyCheckoutForm from './MyCheckoutForm';
import StripeCheckout from 'react-stripe-checkout';
import callApi from "../../utils/apiCaller";
import { Route } from 'react-router-dom';
import ParkList from '../ParkList/ParkList';
import { connect } from 'react-redux';


class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
                payDate: new Date().toLocaleString(),
                mail: '',
                name: '',
                totalPayment: '',
                methodKey: 'stripe'
            
        }
    }

    //set data to state for {payDate,mail,name,totalPayment,methodKey}
    componentWillMount = () => {
        const { data } = this.props.location;
        const {UserDetail} = this.props;
        // console.log(data.price );
        // console.log(UserDetail);
        // console.log(UserDetail.firstName + UserDetail.lastName);
        this.setState({
                mail: UserDetail.mail,//From store of redux
                name: UserDetail.firstName + UserDetail.lastName,//From store of redux
                totalPayment: data.price,//From location data of prev page
        })
    }


    // handle submit purchase
    handleToken = (token) => {
        const { payDate,mail,name,totalPayment,methodKey } = this.state;
        // console.log( payDate );
        // console.log( mail );
        // console.log( name );
        // console.log( totalPayment );
        // console.log( methodKey );
        callApi('payment', 'POST', {
            token,
            payDate,
            mail,
            name,
            totalPayment,
            methodKey
        }).then(res => {
            console.log(res.data);
        }).catch(function (error) {
            if (error.response) {
            }
        });
    }

    render() {
        const { data } = this.props.location;
        return (
            <div className="container">
                <p>Thông tin chi tiết</p>
                <br></br>
                <span >typeName: {data.typeName}</span>
                <br></br>
                <span >effectiveTime: {data.effectiveTime}</span>
                <br></br>
                <span >redemptionDate: {data.redemptionDate}</span>
                <br></br>
                <span >cancelPolicy: {data.cancelPolicy}</span>
                <br></br>
                <span >conversionMethod: {data.conversionMethod}</span>
                <br></br>
                <span >userObject: {data.userObject}</span>
                <br></br>
                <span >price: {data.price}</span>
                <br></br>
                <span >gameName: {data.gameName}</span>
                <br></br>
                <button onClick={this.onClick}>Test</button>
                <StripeCheckout
                    stripeKey={paymentKey.PUBLISHABLE_KEY}
                    token={this.handleToken}
                    // amount={ticket.parkPrice * 100}
                    // name={ticket.parkName}
                    // billingAddress
                    // shippingAddress
                />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        UserDetail: state.User,
    }
};

export default connect(mapStateToProps, null)(Payment);
