import React, { Component, useState } from "react";
import FacebookLogin from "react-facebook-login";
import callApi from "./../utils/apiCaller";


export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
    token:""
  };

  responseFacebook = response => {
    console.log(response);
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
      token: response.accessToken
    });
    //POST name & password to server
    callApi('login/fb', 'POST', {
        name: response.name,
        email: response.email,
        accessToken: response.accessToken
    }).then(res => {
        console.log(res);
    });
  };

  // componentClicked = () => console.log("clicked");

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
          Token: {this.state.token}
        </div>

      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="2656493264626570"
          autoLoad={true}
          fields="name,email,picture"
          // onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}