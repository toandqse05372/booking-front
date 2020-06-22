import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import callApi from "../../utils/apiCaller";
import './lmao.css';
import { getUserLogin } from './../../actions/index';
import { connect } from 'react-redux';

class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
    token: ""
  };


  responseFacebook = response => {
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
      token: response.accessToken
    });
    console.log(response);
    console.log(response.user);
    // var jwtDecode = require('jwt-decode');
    localStorage.setItem('tokenLogin', JSON.stringify(response.accessToken));
    // var decoded = jwtDecode(response.accessToken);
    this.props.fetchUserDetail(response);
    
    // POST name & password to server
    callApi('login/fb', 'POST', {
      accessToken: response.accessToken
    }).then(res => {
      console.log(res);
    });
  };

  componentClicked = () => {
    const { token } = this.state;
    console.log("clicked");
    console.log(token);
  }

  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px"
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
        </div>

      );
    } else {
      fbContent = (
        // <button
        //   type="submit"
        //   className="btn btn-primary"
        //   appId="2656493264626570"
        //   autoLoad={false}
        //   fields="name,email,picture"
        //   // onClick={this.componentClicked}
        //   callback={this.responseFacebook}
        // >
        //   FacebookLogin
        // </button>

        <FacebookLogin
          appId="842841396241232"
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          cssClass="fbbtn"
          data-button-type="continue_with"
          data-use-continue-as="true"
        />
      );
    }

    return <div>{fbContent}</div>;
  }
  
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      fetchUserDetail: (user) => {
          dispatch(getUserLogin(user))
      }
  }
}

export default connect(null, mapDispatchToProps)(Facebook);
