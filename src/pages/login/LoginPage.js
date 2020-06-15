import React, { Component } from 'react';
import callApi from "../../utils/apiCaller";
// import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
// import {Link} from 'react-router-dom';
import Facebook from './Facebook';
import { Form, InputGroup, Button, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { getUserLogin } from './../../actions/index';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtName: '',
            txtPassword: '',
            txtNameRegister: '',
            txtPasswordRegister: '',
            // txtMailRegister: ''
            nameDropDown: 'vi',
            countryCode: 'VN',
            hidden: true,
            visibility: false,
            validated: false,
            userLogin: {

            },
        }
    }
    toggleShow = () => {
        this.setState({
            hidden: !this.state.hidden,
            visibility: !this.state.visibility
        });
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    fetchUserDetailF = () => {
        const { userLogin } = this.state;
    
        this.props.fetchUserDetail(userLogin)
        console.log(userLogin);
    }

    //sent name & password to server
    onClickLogin = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            var jwtDecode = require('jwt-decode');
            e.preventDefault();
            const { t } = this.props;
            var { txtName, txtPassword } = this.state;
            var { history } = this.props;
            callApi('login', 'POST', {
                mail: txtName,
                password: txtPassword,
            }).then(res => {
                alert('Đăng nhập thành công');
                localStorage.setItem('tokenLogin', JSON.stringify(res.data));
                var decoded = jwtDecode(res.data);
                //data will be store in localStorage
                this.props.fetchUserDetail(decoded.user);
                // this.setState({
                //     userLogin: decoded.user
                // })
                // console.log(decoded);
                // console.log(decoded.user);
                // console.log(decoded.user.firstName);
                // console.log(decoded.user.lastName);
                // console.log(decoded.user.mail);
                // console.log(decoded.user.password);
                // console.log(decoded.user.userId);
                // this.fetchUserDetailF();
                history.push("/");
            }).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    if (error.response.data.toString() === 'WRONG_USERNAME_PASSWORD') {
                        alert(t('Error.WRONG_USERNAME_PASSWORD'));
                    }
                    history.push("/login");
                }
            });
        }
        this.setState({
            validated: true
        })
    }

    // componentDidMount(){
    //     const {tokenLogin} = this.state;
    //     localStorage.setItem('tokenLogin', JSON.stringify(tokenLogin));
    // }

    render() {
        const { t } = this.props;
        // var { txtName, txtPassword, nameDropDown, countryCode } = this.state;
        var { txtName, txtPassword,
            validated } = this.state;
        const tokenLogin = localStorage.getItem('tokenLogin');
        // console.log(location);
        if (tokenLogin !== null) {
            return <Redirect to={{
                pathname: '/',
            }} />
        }

        return (
            <div className="container">
            <Form noValidate validated={validated} onSubmit={this.onClickLogin}>
                <Form.Row>
                    <Form.Group as={Col} md="4" 
                    controlId="validationCustomUsername">
                        <Form.Label>{t('UserName.1')}</Form.Label>
                        <p>test@test.com</p>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder={t('UserName.1')}
                                aria-describedby="inputGroupPrepend"
                                required
                                name="txtName"
                                value={txtName}
                                onChange={this.onChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                    </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                        <Form.Label>{t('Password.1')}</Form.Label>
                        <p>test</p>
                        <Form.Control
                            onChange={this.onChange}
                            required
                            // pattern="^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,}$"
                            type={this.state.hidden ? "password" : "text"}
                            placeholder={t('Password.1')}
                            name="txtPassword"
                            value={txtPassword}
                        />

                        <Form.Control.Feedback className="form-control-feedback" type="valid">
                            Look nice.
                    </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            look vcl.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Button type="submit">{t('Login.1')}</Button>
            </Form>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchUserDetail: (user) => {
            dispatch(getUserLogin(user))
        }
    }
}

// export default withTranslation()(LoginPage);
export default connect(null, mapDispatchToProps)(withTranslation()(LoginPage));
