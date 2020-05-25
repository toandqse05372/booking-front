import React, { Component } from 'react';
import callApi from './../../utils/apiCaller';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
// import * as Regex from './../../constants/Regex';
import './testStyle.css';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtNameRegister: '',
            txtPasswordRegister: '',
            txtMailRegister: '',
        }
    }

    //mỗi khi text input thay đổi sẽ gọi hàm này.
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });

    }

  
      
    onClickRegister = (e) => {
        e.preventDefault();
        var { txtNameRegister, 
            txtPasswordRegister, 
            txtMailRegister } = this.state;
        // var { history } = this.props;
        callApi('register', 'POST', {
            username: txtNameRegister,
            password: txtPasswordRegister,
            email: txtMailRegister,
        }).then(res => {
            console.log(res);
            // history.push("/");
        }).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response);
                // if (error.response.data) {
                //     alert("The username or password is incorrect");
                // }
                //   history.push("/");
            }
        });
    }

    handleClick = (lang) => {
        i18next.changeLanguage(lang)
    }




    render() {
        const { t } = this.props;
        var { txtNameRegister, txtPasswordRegister, txtMailRegister } = this.state;
        return (
            <div >
                {/* <nav style={{ width: '100%', padding: '2rem 0', backgroundColor: 'gray' }}>
                    <button onClick={() => this.handleClick('en')} >
                        English
                    </button>
                    <button onClick={() => this.handleClick('jap')} >
                        日本語
                    </button>
                    <button onClick={() => this.handleClick('vi')} >
                        Vietnamese
                    </button>
                </nav> */}
                {/* register form */}
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                    <form onSubmit={this.onClickRegister} >
                        <div className="form-group">
                            <label >{t('UserNameRegister.1')} </label>
                            <input
                                type="text"
                                className="form-control"
                                name="txtNameRegister"
                                value={txtNameRegister}
                                onChange={this.onChange}
                                
                            />
                        </div>

                        <div className="form-group">
                            <label >{t('PasswordRegister.1')} </label>
                            <input
                                id="myInput"
                                type={this.state.hidden ? "password" : "text"}
                                className="form-control"
                                name="txtPasswordRegister"
                                value={txtPasswordRegister}
                                onChange={this.onChange}
                            />
                            
                        </div>


                        <div className="form-group">
                            <label >{t('EmailRegister.1')} </label>
                            <input

                                type="text"
                                className="form-control"
                                name="txtMailRegister"
                                value={txtMailRegister}
                                onChange={this.onChange}
                            />
                        
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary">
                            {t('Register.1')}
                        </button>
                    </form>
                </div>
            </div >
        );
    }

}

export default withTranslation()(LoginPage);
