import React, { Component } from 'react';
import callApi from "../../utils/apiCaller";
// import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
// import {Link} from 'react-router-dom';
import Facebook from './Facebook';
import { Form, InputGroup, Button, Col } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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


    //sent name & password to server
    onClickLogin = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            console.log("1")
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            const { t } = this.props;
            var { txtName, txtPassword } = this.state;
            var { history } = this.props;
            callApi('login', 'POST', {
                mail: txtName,
                password: txtPassword,
            }).then(res => {
                console.log(res.data);
                localStorage.setItem('tokenLogin', JSON.stringify(res.data));
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

        return (
            <Form noValidate validated={validated} onSubmit={this.onClickLogin}>
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
                        &nbsp;
                        {/* <FontAwesomeIcon
                            id="e"
                            icon={this.state.visibility ? "eye-slash" : "eye"}
                            onClick={this.toggleShow}
                        /> */}
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
            // <div >

            //     {/* login form */}
            //     <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
            //         <form onSubmit={this.onClickLogin} >
            //             <div className="form-group">

            //                 <label >{t('UserName.1')} </label>
            //                 <input
            //                     type="text"
            //                     className="form-control"
            //                     name="txtName"
            //                     value={txtName}
            //                     onChange={this.onChange}
            //                 />
            //             </div>
            //             <div className="form-group">
            //                 <label >{t('Password.1')} </label>
            //                 <input
            //                     type="password"
            //                     className="form-control"
            //                     name="txtPassword"
            //                     value={txtPassword}
            //                     onChange={this.onChange}
            //                 />
            //             </div>
            //             <button
            //                 type="submit"
            //                 className="btn btn-primary">
            //                 {t('Login.1')}
            //             </button>
            //             <Facebook />
            //         </form>
            //     </div>
            // </div >
        );
    }

}

export default withTranslation()(LoginPage);
