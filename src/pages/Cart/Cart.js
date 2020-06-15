import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actAddToCart } from './../../actions/index';
import * as paymentKey from './../../constants/paymentKey';
import StripeCheckout from 'react-stripe-checkout';
import callApi from "../../utils/apiCaller";

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payDate: new Date().toLocaleString(),
            mail: '',
            name: '',
            totalPayment: '',
            methodKey: '',
            totalS: 0
        }
    }

    //caculate and return total bill
    showTotalAmout = () => {
        const { cart } = this.props;
        var total = 0;
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                total += cart[i].product.price * cart[i].quantity;
            }
        }
        return total;
    }

    componentWillMount = () => {
        const { UserDetail } = this.props;
        var totalPayment = this.showTotalAmout();
        this.setState({
            mail: UserDetail.mail,//From store of redux
            name: UserDetail.firstName + UserDetail.lastName,//From store of redux
            totalPayment: totalPayment
        })
    }

    // handle submit purchase
    handleToken = (token) => {
        var stripeToken = token.id;
        const { payDate, mail, name, totalPayment, methodKey } = this.state;
        callApi('payment', 'POST', {
            stripeToken,
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

    showSearchList = (searchList) => {
        var result = null;
        if (searchList.length > 0) {
            result = searchList.map((data, index) => {
                return (
                    //specifire key for each data
                    <div key={data.id}>
                        <div>
                            <ul>
                                <li>
                                    <span >id: {data.product.id}</span>
                                    <br></br>
                                    <span >Type Name: {data.product.typeName}</span>
                                    <br></br>
                                    <span >Game Name: {data.product.gameName}</span>
                                    <br></br>
                                    <span >Price: {data.product.price}</span>
                                    <br></br>
                                    <span >User Object: {data.product.userObject}</span>
                                    <br></br>
                                    <span >Quantity: {data.quantity}</span>
                                    <br></br>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            });
        }
        else if (searchList.length === 0) {
            return (
                <h1>Hiện tại chưa có Ticket nào</h1>
            );
        }
        return result;
    }

    render() {
        const { t } = this.props;
        const { cart } = this.props
        // console.log(cart);
        return (
            <div className="container">
                <p>Cart Page</p>
                <div className="row">
                    <div className="col">
                        {this.showSearchList(cart)}
                    </div>
                    <div className="col">
                        <h4>
                            <strong>{this.showTotalAmout()} $</strong>
                        </h4>
                        {/* tab select payment method start */}
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#home">By Visa</a>

                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#menu1">By Momo</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div id="home" class="container tab-pane active"><br></br>
                                <StripeCheckout
                                    stripeKey={paymentKey.PUBLISHABLE_KEY}
                                    token={this.handleToken}
                                // amount={ticket.parkPrice * 100}
                                // name={"Goboki"}
                                // billingAddress
                                // shippingAddress
                                />
                            </div>
                            <div id="menu1" class="container tab-pane fade"><br></br>
                                <h3>Căm minh sun</h3>
                            </div>
                        </div>
                        {/* End collapse part */}
                        {/* tab select payment method end */}
                    </div>
                </div>
            </div>
        );
    }


}


const mapStateToProps = state => {
    return {
        cart: state.cart,
        UserDetail: state.User,
    }
};


export default connect(mapStateToProps, null)(Cart);



