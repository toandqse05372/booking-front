import React, { Component } from 'react';
import callApi from "./../utils/apiCaller";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
// import {Link} from 'react-router-dom';
import Facebook from '../components/Facebook';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtName: '',
            txtPassword: '',
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


    onSave = (e) => {
        e.preventDefault();
        var { txtName, txtPassword } = this.state;
        //POST name & password to server
        callApi('login', 'POST', {
            username: txtName,
            password: txtPassword,
        }).then(res => {
            console.log(res);
        }).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response);
            }
        
          });
    }

    //handle changeLanguage
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
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                    <form onSubmit={this.onSave} >
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
                        Login
                        </button>
                        {/* <a
                            className="btn btn-primary"
                            href="/#"
                            role="button">
                        Login with facebook */}
                        {/* </a> */}
                        {/* <Link
                            className="btn btn-primary"
                            to="/login/fb"
                            role="button">
                        Login  facebook
                        </Link> */}
                        <Facebook />
                    </form>
                </div>
            </div >
        );
    }

}

export default withTranslation()(LoginPage);
