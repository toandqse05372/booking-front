import React, { Component } from 'react';
import callApi from "../../utils/apiCaller";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
// import {Link} from 'react-router-dom';
import Facebook from './Facebook';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtName: '',
            txtPassword: '',
            txtNameRegister: '',
            txtPasswordRegister: '',
            // txtMailRegister: ''
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


    //sent name & password to server
    onClickLogin = (e) => {
        e.preventDefault();
        var { txtName, txtPassword } = this.state;
        var { history } = this.props;
        callApi('login', 'POST', {
            username: txtName,
            password: txtPassword,
        }).then(res => {
            console.log(res);
            history.push("/");
        }).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                if (error.response.data) {
                    alert("The username or password is incorrect");
                }
                //   history.push("/");

            }
        });
    }

    handleClick(lang) {
        i18next.changeLanguage(lang)
    }

    render() {
        const { t } = this.props;
        var { txtName, txtPassword } = this.state;
        return (
            <div >
                <nav style={{ width: '100%', padding: '2rem 0', backgroundColor: 'gray' }}>
                    <button onClick={() => this.handleClick('en')} >
                        English
                    </button>
                    <button onClick={() => this.handleClick('jap')} >
                        日本語
                    </button>
                    <button onClick={() => this.handleClick('vi')} >
                        Vietnamese
                    </button>
                </nav>
                {/* login form */}
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                    <form onSubmit={this.onClickLogin} >
                        <div className="form-group">
                            <label >{t('UserName.1')} </label>
                            <input

                                type="text"
                                className="form-control"
                                name="txtName"
                                value={txtName}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label >{t('Password.1')} </label>
                            <input
                                type="password"
                                className="form-control"
                                name="txtPassword"
                                value={txtPassword}
                                onChange={this.onChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary">
                            {t('Login.1')}
                        </button>
                        
                        <Facebook />
                    </form>
                </div>
            </div >
        );
    }

}

export default withTranslation()(LoginPage);
