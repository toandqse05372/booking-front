import React, { Component } from 'react';
import callApi from './../../utils/apiCaller';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, InputGroup, Button, Col } from 'react-bootstrap'

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      txtNameRegister: '',
      txtPasswordRegister: '',
      txtMailRegister: '',
      hidden: true,
      visibility: false
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    // var { errors } = this.state;
    this.setState({
      [name]: value
    });
  }

  onClickRegister = (e) => {
    e.preventDefault();
    var { txtNameRegister, txtPasswordRegister, txtMailRegister } = this.state;
    // var { history } = this.props;

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      console.log("1")
      e.preventDefault();
      e.stopPropagation();
    } else {
      callApi('register', 'POST', {
        username: txtNameRegister,
        password: txtPasswordRegister,
        email: txtMailRegister,
      }).then(res => {
        console.log(res);
        // alert("Register Success");
        // history.push("/login");
      }).catch(function (myError) {
        if (myError.response) {
          // Request made and server responded
          console.log(myError.response);
          // if (error.response.data) {
          //     alert("The username or password is incorrect");
          // }
          //   history.push("/");
        }
      });
    }

    this.setState({
      validated: true
    })
  }

  toggleShow = () => {
    this.setState({
      hidden: !this.state.hidden,
      visibility: !this.state.visibility
    });
  }

  componentDidMount() {
    if (this.props.txtPasswordRegister) {
      this.setState({ txtPasswordRegister: this.props.txtPasswordRegister });
    }
  }
  
  render() {
    var { validated, txtNameRegister,
      txtPasswordRegister, txtMailRegister } = this.state;
    const { t } = this.props;

    return (
      <Form noValidate validated={validated} onSubmit={this.onClickRegister}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>{t('UserName.1')}</Form.Label>
            <InputGroup>
              {/* <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend> */}
              <Form.Control
                type="text"
                placeholder={t('UserName.1')}
                aria-describedby="inputGroupPrepend"
                required
                name="txtNameRegister"
                value={txtNameRegister}
                onChange={this.onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
                    </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>{t('Password.1')}</Form.Label>
            <FontAwesomeIcon
              id="e"
              icon={this.state.visibility ? "eye-slash" : "eye"}
              onClick={this.toggleShow}
            />
            &nbsp;
                <Form.Control
              onChange={this.onChange}
              required
              pattern="^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,}$"
              type={this.state.hidden ? "password" : "text"}
              placeholder={t('Password.1')}
              // defaultValue="Mark"
              name="txtPasswordRegister"
              value={txtPasswordRegister}

            />
            <Form.Control.Feedback className="form-control-feedback" type="valid">
              Look nice.
                    </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              look vcl.
                    </Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  defaultValue="Otto"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group> */}

        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Mail</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mail"
              required
              pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
              name="txtMailRegister"
              value={txtMailRegister}
              onChange={this.onChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
                  <i className="fas fa-eye"></i>
              <i className="fas fa-camera"></i>
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Button type="submit">{t('Register.1')}</Button>
      </Form>



    );
  }

}

export default withTranslation()(Register);
