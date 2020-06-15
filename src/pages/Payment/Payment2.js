import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
// import '../styles/common.css';

// const CARD_OPTIONS = {
//     iconStyle: 'solid',
//     style: {
//       base: {
//         iconColor: '#c4f0ff',
//         color: '#fff',
//         fontWeight: 500,
//         fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
//         fontSize: '16px',
//         fontSmoothing: 'antialiased',
//         ':-webkit-autofill': {color: '#fce883'},
//         '::placeholder': {color: '#87bbfd'},
//       },
//       invalid: {
//         iconColor: '#ffc7ee',
//         color: '#ffc7ee',
//       },
//     },
//   };

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txtName: '',
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        const { stripe, elements } = this.props;

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);
        const {txtName} = this.state;
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            txtName: txtName
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod.id);
            console.log('[PaymentMethod]', txtName)
        }
    };

    render() {
        const { stripe } = this.props;
        const {txtName} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                type="text"
                placeholder="dien vao"
                name="txtName"
                value={txtName}
                onChange={this.onChange}
                />
                <CardElement
                // options={CARD_OPTIONS}
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe}>
                    Pay
        </button>
            </form>
        );
    }
}

const InjectedCheckoutForm = () => {
    return (
        <ElementsConsumer>
            {({ elements, stripe }) => (
                <CheckoutForm elements={elements} stripe={stripe} />
            )}
        </ElementsConsumer>
    );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const Payment2 = () => {
    return (
        <div className="container">
        <Elements stripe={stripePromise}>
            <InjectedCheckoutForm />
        </Elements>
        </div>
    );
};

export default Payment2;