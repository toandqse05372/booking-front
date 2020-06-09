import React, { Component } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as paymentKey from './../../constants/paymentKey';
import MyCheckoutForm from './MyCheckoutForm';
import StripeCheckout from 'react-stripe-checkout';
import callApi from "../../utils/apiCaller";


class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: ({
                parkName: "halon",
                parkTime: "kind of time",
                parkId: "1",
                parkPrice: "200$"
            }),
        }
    }

    handleToken(token){
        console.log({token});
        callApi('login', 'POST', {
            token,
        }).then(res => {
        }).catch(function (error) {
            if (error.response) {
            }
        });
    }

    render() {
        const {ticket, parkName} = this.state;
        return (
            <div>
                {/* <Elements stripe={paymentKey.PUBLISHABLE_KEY}>
                    <MyCheckoutForm />
                </Elements> */}
                <StripeCheckout
                    stripeKey={paymentKey.PUBLISHABLE_KEY}
                    token={this.handleToken}
                    // ticket = {ticket}
                    // billingAddress
                    // shippingAddress
                    // parkName={parkName}
                />
            </div>
        );
    }
}

export default Payment;
