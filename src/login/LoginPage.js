import React, { Component } from 'react';
import callApi from "./../utils/apiCaller";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtName: '',
            txtPassword: '',
        }
    }


    onChange =(e)=> {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }


    onSave = (e)=> {
        e.preventDefault();
        var {txtName, txtPassword} = this.state;
            callApi('login', 'POST', {
                username : txtName,
                password : txtPassword,
        }).then(res=> {
            console.log(res);
        });
    }

    //handle changeLanguage
    handleClick(lang) {
        i18next.changeLanguage(lang)
    }

    render() {
        var {txtName, txtPassword} = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <form onSubmit = {this.onSave} >
                    <div className="form-group">
                        <label >UerName </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="txtName" 
                            value={txtName}
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label >Password: </label>
                        <input 
                        type="password" 
                        className="form-control"
                        name="txtPassword" 
                        value={txtPassword}
                        onChange = {this.onChange}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >Login</button>
                    <a
                            className="btn btn-primary"
                            href="/#"
                            role="button">
                        Login with facebook
                        </a>
                </form>

            </div>
        );
    }
}

export default LoginPage;
