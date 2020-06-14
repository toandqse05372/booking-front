import React, { Component } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as paymentKey from './../../constants/paymentKey';
import MyCheckoutForm from './MyCheckoutForm';
import StripeCheckout from 'react-stripe-checkout';
import callApi from "../../utils/apiCaller";
import { Route } from 'react-router-dom';
import ParkList from '../ParkList/ParkList';


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
            listResult:[]
        }
    }

    componentWillMount = () => {
        callApi('ticketType', 'GET', null).then(res => {
            // console.log(res.data);
            this.setState({
                listResult: res.data
            })
        }).catch(function (error) {
            if (error.response) {
                console.log(error);
            }
        });
    }

    showTicketTypeList = (TicketList) => {
        var result = null;
        if (TicketList.length > 0) {
            result = TicketList.map((data, index) => {
                return (
                    //specifire key for each data
                    <div key={data.id}>
                        <div>
                            <ul>
                                <li>
                                    <span >id: {data.id}</span>
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
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            });
        }
        else if (TicketList.length === 0) {
            return (
                <p>Not Found</p>
            );
        }
        return result;
    }



    handleToken = (token) => {
        const { ticket } = this.state;
        console.log({ token });
        callApi('payment', 'POST', {
            token,
            ticket
        }).then(res => {
            console.log(res.data);
            console.log(res.data.id);
        }).catch(function (error) {
            if (error.response) {
            }
        });
    }

    render() {
        // const { data } = this.props.location;
        console.log(this.props.location);

        const { ticket, parkName, listResult } = this.state;
        return (
            <div>
                <a>payment </a>
                {/* <StripeCheckout
                    stripeKey={paymentKey.PUBLISHABLE_KEY}
                    token={this.handleToken}
                    amount={ticket.parkPrice * 100}
                    name={ticket.parkName}
                    billingAddress
                    shippingAddress
                /> */}
                {/* <section>
                    {this.showTicketTypeList(listResult)}
                </section> */}
            </div>
        );
    }
}

export default Payment;
