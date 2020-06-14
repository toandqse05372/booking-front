import React, { Component } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as paymentKey from './../../constants/paymentKey';
import MyCheckoutForm from './MyCheckoutForm';
import StripeCheckout from 'react-stripe-checkout';
import callApi from "../../utils/apiCaller";
import './another.css';
import Payment from './Payment';
import { Link } from 'react-router-dom';

class AnotherOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: ({
        parkName: "halon",
        parkTime: "kind of time",
        parkId: "1",
        parkPrice: "200$"
      }),
      listResult: [],
    }
  }

  async handleToken(token) {
    // const { ticket } = this.state;
    // console.log({ token });
    //  await callApi('payment', 'POST', {
    //     token,
    //     ticket
    // }).then(res => {
    //     console.log(res.data);
    //     console.log(res.data.id);
    // }).catch(function (error) {
    //     if (error.response) {
    //     }
    // });
  }

  componentWillMount = () => {
    callApi('ticketType', 'GET', null).then(res => {
      console.log(res.data);
      this.setState({
        listResult: res.data
      })
    }).catch(function (error) {
      if (error.response) {
        console.log(error);
      }
    });
  }

  myOnClick = (id) => {
    console.log(id);
  }

  showTicketTypeList = (TicketList) => {
    var result = null;

    const {match} = this.props;
    // console.log(match);
    var url = match.url;

    if (TicketList.length > 0) {
      result = TicketList.map((data, index) => {
        return (
          //specifire key for each data
          // <div key={data.id}>
          //     <div>
          //         <ul>
          //             <li>
          //                 <span >id: {data.id}</span>
          //                 <br></br>
          //                 <span >typeName: {data.typeName}</span>
          //                 <br></br>
          //                 <span >effectiveTime: {data.effectiveTime}</span>
          //                 <br></br>
          //                 <span >redemptionDate: {data.redemptionDate}</span>
          //                 <br></br>
          //                 <span >cancelPolicy: {data.cancelPolicy}</span>
          //                 <br></br>
          //                 <span >conversionMethod: {data.conversionMethod}</span>
          //                 <br></br>
          //                 <span >userObject: {data.userObject}</span>
          //                 <br></br>
          //                 <span >price: {data.price}</span>
          //                 <br></br>
          //                 <span >gameName: {data.gameName}</span>
          //                 <br></br>
          //             </li>
          //         </ul>
          //     </div>
          // </div>
          <div key={index} id="accordion">
            
            <div className="card">
              <div data-toggle="collapse" data-target={"#" + data.id} className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <div className="container">
                    <div className="row">
                      <div className="col-8">
                        <p style={{ fontFamily: "Arial" }} >
                          Game Name: {data.typeName} --- Id: {data.id}
                        </p>
                      </div>
                      <div className="col-2">
                        <p>
                          Price: {data.price}
                        </p>
                      </div>
                      <div className="col">
                        <div
                          // onClick={this.myOnClick(data.id)}
                          style={{ borderColor: "#FF7062" }} >
                          {/* <StripeCheckout
                            
                            stripeKey={paymentKey.PUBLISHABLE_KEY}
                            token={this.handleToken}
                          >
                          </StripeCheckout> */}
                          <Link to={{
                                pathname: "/payment",
                                data: 'my 1'
                              }}>
                            <button>Payment
                              
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </h5>
              </div>
              <div id={data.id} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                  <div className="row">
                    <div className="Col">
                      <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a
                          className="nav-link active" id="v-pills-home-tab"
                          data-toggle="pill" href={"#1" + data.id}
                          role="tab" aria-controls="v-pills-home"
                          aria-selected="true">Game Name
                        </a>
                        <a
                          className="nav-link" id="v-pills-profile-tab"
                          data-toggle="pill" href={"#2" + data.id}
                          role="tab" aria-controls="v-pills-profile"
                          aria-selected="false">User Object
                        </a>
                        <a
                          className="nav-link" id="v-pills-messages-tab"
                          data-toggle="pill" href={"#3" + data.id}
                          role="tab" aria-controls="v-pills-messages"
                          aria-selected="false">Cancel Policy
                        </a>
                        <a
                          className="nav-link" id="v-pills-settings-tab"
                          data-toggle="pill" href={"#4" + data.id}
                          role="tab" aria-controls="v-pills-settings"
                          aria-selected="false">Effective Time
                        </a>
                      </div>
                    </div>
                    <br></br>
                    <div className="Col">
                      <div style={{ padding: "2em", margin: "2em" }} className="tab-content" id="v-pills-tabContent">
                        <div
                          className="tab-pane fade show active" id={"1" + data.id}
                          role="tabpanel" aria-labelledby="v-pills-home-tab">
                          {data.gameName}
                        </div>
                        <div
                          className="tab-pane fade" id={"2" + data.id}
                          role="tabpanel" aria-labelledby="v-pills-profile-tab">
                          {data.userObject}
                        </div>
                        <div
                          className="tab-pane fade" id={"3" + data.id}
                          role="tabpanel" aria-labelledby="v-pills-messages-tab">
                          {data.cancelPolicy}
                        </div>
                        <div
                          className="tab-pane fade" id={"4" + data.id}
                          role="tabpanel" aria-labelledby="v-pills-settings-tab">
                          {data.effectiveTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
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



  // handleToken = (token) => {
  //   const { ticket } = this.state;
  //   console.log({ token });
  //   callApi('payment', 'POST', {
  //     token,
  //     ticket
  //   }).then(res => {
  //     console.log(res.data);
  //     console.log(res.data.id);
  //   }).catch(function (error) {
  //     if (error.response) {
  //     }
  //   });
  // }

  render() {
    const { ticket, parkName, listResult } = this.state;
    const accordionList = [{ title: 'First Accordion' }, { title: 'Second Accordion' }, { title: 'Third Accordion' }];
    return (
      // <div>
      //     {/* <StripeCheckout
      //         stripeKey={paymentKey.PUBLISHABLE_KEY}
      //         token={this.handleToken}
      //         amount={ticket.parkPrice * 100}
      //         name={ticket.parkName}
      //         billingAddress
      //         shippingAddress
      //     /> */}
      //     <section>
      //         {this.showTicketTypeList(listResult)}
      //     </section>
      // </div>

      <div className="container">
        {this.showTicketTypeList(listResult)}
      </div>
    );
  }
}

export default AnotherOne;
