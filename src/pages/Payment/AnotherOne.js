import React, { Component } from 'react';
import callApi from "../../utils/apiCaller";
import './another.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actAddToCart } from '../../actions/index';

class AnotherOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listResult: [],
    }
  }

  // async handleToken(token) {
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
  // }

  //Get all Ticket Type by API
  componentWillMount = () => {
    callApi('ticketType', 'GET', null).then(res => {
      this.setState({
        listResult: res.data
      })
    }).catch(function (error) {
      if (error.response) {
        console.log(error);
      }
    });
  }

  onAddToCartOfProduct = (product) => {
    this.props.onAddToCartOfPC(product);
}

  //show Ticket funtion
  showTicketTypeList = (TicketList) => {
    var result = null;
    if (TicketList.length > 0) {
      //by map funtion
      result = TicketList.map((data, index) => {
        return (
          //with key is index of each
          <div key={index} id="accordion">
            <div className="card">
              <div
                data-toggle="collapse" data-target={"#" + data.id}
                className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <div className="container">
                    <div className="row">
                      <div className="col-8">
                        <p style={{ fontFamily: "Arial" }} >
                          Game Name: {data.typeName} --- Id: {data.id}
                        </p>
                      </div>
                      <div className="col-2">
                        <p>Price: {data.price}</p>
                      </div>
                      <div className="col">
                        <div
                          style={{ borderColor: "#FF7062" }} >
                          {/* Link to payment page with data is choosed Ticket */}
                          {/* <Link to={{
                                pathname: "/payment",
                                data: data
                              }}>
                            <button>Payment
                            </button>
                          </Link> */}
                          <button
                          onClick={ () => this.onAddToCartOfProduct(data) }
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </h5>
              </div>
              {/* collapsed part */}
              <div
                id={data.id} className="collapse"
                aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                  <div className="row">
                    <div className="Col">
                      <div 
                      className="nav flex-column nav-pills" id="v-pills-tab" 
                      role="tablist" aria-orientation="vertical">
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
              {/* End collapse part */}
            </div>
            <br></br>
          </div>
        );
      });
    }
    else if (TicketList.length === 0) {
      return (
        <p> Not Found </p>
      );
    }
    return result;
  }

  render() {
    const { listResult } = this.state;
    return (
      <div className="container">
        {/* show ticket list with result get from API */}
        {this.showTicketTypeList(listResult)}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddToCartOfPC: (product) => {
      dispatch(actAddToCart(product, 1));
    },
  }
}

// export default AnotherOne;
export default connect(null, mapDispatchToProps)(AnotherOne);
