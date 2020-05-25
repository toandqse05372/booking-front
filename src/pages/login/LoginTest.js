import React, { Component } from 'react';
import callApi from '../../utils/apiCaller';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as Regex from '../../constants/Regex';
import './testStyle.css';

class LoginTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtNameRegister: '',
            txtPasswordRegister: '',
            txtMailRegister: '',
            errors: {
                errFullName: '',
                errEmail: '',
                errPassword: '',
            },
            hidden: true,
            visibility: true
        }
    }



    //mỗi khi text input thay đổi sẽ gọi hàm này.
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var { errors } = this.state;
        this.setState({
            [name]: value
        });
        // chạy theo các trường hợp input
        switch (name) {
            case 'txtNameRegister':
                //nếu thỏa mãn not Null set error rỗng, ngược lại set mesage 
                errors.errFullName =
                    (value.toString().trim().length)
                        ? ''
                        : 'Not Null';
                break;
            case 'txtMailRegister':
                errors.errEmail =
                    //nếu thỏa mãn regex thì set error rỗng, ngược lại set message
                    (Regex.VALID_EMAIL.test(value))
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'txtPasswordRegister':
                errors.errPassword =
                    //nếu thỏa mãn regex thì set error rỗng, ngược lại set message
                    Regex.VALID_PASSWORD.test(value)
                        ? ''
                        : 'At least 8 words | at least 1 number | !whiteSpace';
                break;
            default:
                break;
        }
    }

    onClickRegister = (e) => {
        e.preventDefault();
        var { txtNameRegister,
            txtPasswordRegister,
            txtMailRegister } = this.state;
        var { history } = this.props;
        callApi('register', 'POST', {
            username: txtNameRegister,
            password: txtPasswordRegister,
            email: txtMailRegister,
        }).then(res => {
            console.log(res);
            // alert("Register Success");
            history.push("/login");
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
    toggleShow = () => {
        this.setState({
            hidden: !this.state.hidden,
            visibility: !this.state.visibility
        });

    }

    handleClick = (lang) => {
        i18next.changeLanguage(lang)
    }

    componentDidMount() {
        if (this.props.txtPasswordRegister) {
            this.setState({ txtPasswordRegister: this.props.txtPasswordRegister });
        }
    }

    render() {
        const { t } = this.props;
        const { errors } = this.state;

        var { txtNameRegister, txtPasswordRegister, txtMailRegister } = this.state;
        return (
            <div >
                <nav style={{ width: '100%', padding: '2rem 0', backgroundColor: 'gray' }}>
                    <button onClick={() => this.handleClick('en')} >
                        EnglishHHHHHH
                    </button>
                    <button onClick={() => this.handleClick('jap')} >
                        日本語
                    </button>
                    <button onClick={() => this.handleClick('vi')} >
                        Vietnamese
                    </button>
                </nav>
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
                            {errors.errFullName.length > 0 &&
                                <span className='error'>
                                    {errors.errFullName}
                                </span>}
                        </div>


                        <div className="form-group">
                            <label >{t('PasswordRegister.1')} </label>
                            <span
                                id="e"
                                    type="button"
                                    onClick={this.toggleShow}
                                    className="material-icons visibility">
                                    {this.state.visibility ? "visibility_off" : "visibility_on"}
                                </span>
                                <input
                                    type={this.state.hidden ? "password" : "text"}
                                    className="form-control"
                                    name="txtPasswordRegister"
                                    value={txtPasswordRegister}
                                    onChange={this.onChange}
                                />
                            {/* <div class="input-container">
                                <input type="password" />
                                <i class="material-icons visibility">visibility_off</i>
                            </div> */}
                            <br></br>
                            {errors.errPassword.length > 0 &&
                                <span className='error'>{errors.errPassword}
                                </span>}
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
                            {errors.errEmail.length > 0 &&
                                <span className='error'>{errors.errEmail}
                                </span>}
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

export default withTranslation()(LoginTest);
