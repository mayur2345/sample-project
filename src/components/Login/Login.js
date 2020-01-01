import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { startUserLogin } from '../../actions/loginActions';
import '../../scss/Login.scss';
import { Link } from 'react-router-dom';
import { PATH } from '../../properties/paths';

class Login extends React.Component {
    state = {
        loading: false,
        errorMessage: '',
        email: '',
        password: '',
    
        formValid: false,
        emailValid: false,
        passwordValid: false
    }

    EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    componentWillReceiveProps(nextProps) {
        this.setState({loading: false})
        this.setState({errorMessage: nextProps.loginErrorMsg.text});
        if(nextProps.user.isAuthenticated === true) {
            localStorage.setItem("isAuthenticated", "true");
            nextProps.history.push(PATH.clients);
        }
    }

    onChange = e => { 
        const name = e.target.name;
        const value = e.target.value;
        switch(e.target.name){
            case 'email': {
                this.setState({email: value}, () => {this.validateField(name, value)});
                break;
            }
            case 'password': {
                this.setState({password: value}, () => {this.validateField(name, value)});
                break;
            }
            default:
                return;
        }
    }

    validateField(fieldName, value) {
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let errorMessage = this.state.errorMessage;
        switch(fieldName) {
            case 'email': {
                emailValid = this.EMAIL_REGEX.test(value.toLowerCase());
                errorMessage = emailValid ? '' : 'Email is invalid';
                break;
            }
            case 'password': {
                passwordValid = value.length >= 6;
                errorMessage = passwordValid ? '' : "Password is too short";
                break;
            }
            default: 
                break;
        }
        this.setState({errorMessage: errorMessage, emailValid: emailValid, passwordValid: passwordValid}, this.validateForm)
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    loginUser = e => {
        e.preventDefault();
        this.setState({ loading: true});
        let user;
        user = { email: this.state.email, password: this.state.password, isAuthenticated: false}
        this.props.startUserLogin(user, this.props);
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                        <div className="login100-form validate-form">
                            <span className="login100-form-title p-b-49">
                                <img className="logo_img" alt="" />
                            </span>

                            <form onSubmit={this.loginUser}>
                                <div className="wrap-input100 validate-input m-b-23" data-validate="Email is reauired">
                                    <span className="label-input100">Email</span>
                                    <input 
                                    className="input100" 
                                    type="email" 
                                    name="email" 
                                    placeholder="Type your Email"
                                    onChange={this.onChange} 
                                    value={this.state.email} />
                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    <span className="label-input100">Password</span>
                                    <input 
                                        className="input100" 
                                        type="password" 
                                        name="password" 
                                        placeholder="Type your password"
                                        onChange={this.onChange} 
                                        value={this.state.password} />
                                    <span className="focus-input100" data-symbol="&#xf190;"></span>
                                </div>
                                { this.state.loading ? <p>Logging in...</p> : null }
                                <p className="text-danger">{ this.state.errorMessage }</p>
                                <div className="reset">
                                    <Link to="/reset-password">Forgot password?</Link>
                                </div> 
                                <div className="container-login100-form-btn m-t-40">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                        <button className="login100-form-btn" type="submit"
                                           disabled={!this.state.formValid} >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = ( state, _) => ({
    user: state.loginState.user,
    loginErrorMsg: state.loginState.loginErrorMsg
});

const mapDispatchToProps = ( dispatch, _) => ({
    startUserLogin: bindActionCreators(startUserLogin, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps) (Login);