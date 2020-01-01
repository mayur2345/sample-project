import React, { FormEvent } from 'react';

import '../../scss/Login.scss'
import { LoginService } from '../../services/loginService';

interface IResetPasswordProps {
    history: any;
}

interface IResetPasswordState {
    confirming: boolean;
    errorMessage: string;
    newPassword: string;
    confirmNewPassword: string;

    formValid: boolean;
    newPasswordValid: boolean;
    confirmNewPasswordValid: boolean;
}

interface ILinkStateProps {

}

type Props = IResetPasswordProps & ILinkStateProps;

class ResetPassword extends React.Component<Props, IResetPasswordState> {
    
    loginService: LoginService = new LoginService(this.props);
    constructor(props: Props) {
        super(props);
        this.state = {
            confirming: false,
            errorMessage: '',
            newPassword: '',
            confirmNewPassword: '',

            formValid: false,
            newPasswordValid: false,
            confirmNewPasswordValid: false
        }
        
        this.resetPassword = this.resetPassword.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e:any) {
        const name = e.target.name;
        const value = e.target.value;
        switch(e.target.name){
            case 'newPassword': {
                this.setState({newPassword: e.target.value}, () => this.validateField(name, value));
                break;
            }
            case 'confirmNewPassword': {
                this.setState({confirmNewPassword: e.target.value}, () => this.validateField(name, value));
                break;
            }
        }
    }

    validateField(fieldName: string, value: string) {
        let newPasswordValid = this.state.newPasswordValid;
        let confirmNewPasswordValid = this.state.confirmNewPasswordValid;
        let errorMessage = this.state.errorMessage;
        switch(fieldName) {
            case 'newPassword': {
                newPasswordValid = value.length >= 6;
                errorMessage = newPasswordValid ? '' : 'Password is too short';
                break;
            }
            case 'confirmNewPassword': {
                confirmNewPasswordValid = value.length >= 6;
                errorMessage = confirmNewPasswordValid ? '' : "Password is too short";
                break;
            }
            default: 
                break;
        }
        this.setState({errorMessage: errorMessage, newPasswordValid: newPasswordValid, confirmNewPasswordValid: confirmNewPasswordValid}, this.validateForm)

    }

    validateForm() {
        this.setState({formValid: this.state.newPasswordValid && this.state.confirmNewPasswordValid});
    }

    resetPassword(e:FormEvent) {
        e.preventDefault();
        this.setState({confirming: true});
        if (this.state.newPassword !== this.state.confirmNewPassword) {
            this.setState({errorMessage: "Password doesn't match"});
            this.setState({confirming: false});
        } 
        else if(this.state.newPassword && this.state.confirmNewPassword) {
            this.loginService.updatePassword(this.state.newPassword).subscribe(
                (data: any) => {
                    console.log(data);
                    this.setState({confirming: false});
                    this.props.history.push("/login");
                }, 
                (error: any) => {
                    this.setState({ errorMessage: error ,confirming: false });
                }
            );
        } else {
            this.setState({errorMessage: "Invalid input"});
            this.setState({confirming: false});
        }
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                        <div className="login100-form validate-form">
                            <span className="login100-form-title p-b-49">
                                <img className="logo_img" alt=""></img>
                            </span>

                            <form onSubmit={this.resetPassword}>
                                <div className="wrap-input100 validate-input m-b-23" data-validate="field is reauired">
                                    <span className="label-input100">New Password</span>
                                    <input 
                                    className="input100" 
                                    type="password" 
                                    name="newPassword"
                                    value={this.state.newPassword}
                                    onChange={this.onChange} 
                                    placeholder="New Password" />
                                    <span className="focus-input100" data-symbol="&#xf190;"></span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="field is required">
                                    <span className="label-input100">Confirm New Password</span>
                                    <input 
                                    className="input100" 
                                    type="password" 
                                    name="confirmNewPassword" 
                                    value={this.state.confirmNewPassword}
                                    onChange={this.onChange}
                                    placeholder="Confirm New password" />
                                    <span className="focus-input100" data-symbol="&#xf190;"></span>
                                </div>
                                { this.state.confirming ? <p>Confirming...</p> : null }
                                <p className="text-danger">{ this.state.errorMessage }</p>
                                {
                                    /* <div className="text-right p-t-8 p-b-31">
                                            <a>
                                            Forgot password?
                                            </a>
                                            
                                        </div> */
                                }

                                <div className="container-login100-form-btn m-t-40">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                        <button disabled={!this.state.formValid} className="login100-form-btn" type="submit">Done</button>
                                    </div>
                                </div>
                            </form>

                            {/* <div className="txt1 text-center p-t-54 p-b-20">
                                    <span>
                                        Sign Up Using
                                    </span>
                                </div>
        
                                <div class="flex-c-m">
                                    <a href="#" class="login100-social-item bg1">
                                        <i class="fa fa-facebook"></i>
                                    </a>
                        
                                    <a href="#" class="login100-social-item bg2">
                                        <i class="fa fa-linkedin"></i>
                                    </a>
                        
                                    <a href="#" class="login100-social-item bg3">
                                        <i class="fa fa-google"></i>
                                    </a>
                                </div>
                            */}

                            {/* 
                            <div class="flex-col-c p-t-30">
                                <div class="container-login100-form-btn">
                                    <div class="wrap-login100-form-btn">
                                        <div class="login100-form-bgbtn"></div>
                                            <button class="login100-form-btn">Sign Up</button>
                                        </div>
                                    </div>
                            </div> -->*/
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPassword;