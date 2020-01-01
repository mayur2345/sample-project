import { IUser } from '../types/User';
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, AppActions } from  '../types/actions';
import { Dispatch } from 'redux';
import { AppState } from '../store/configureStore';
import { LoginService } from '../services/loginService';
import { IErrorMessage } from '../types/ErrorMessage';


export const userLoginSuccess = (user: IUser): AppActions => ({
    type: USER_LOGIN_SUCCESS,
    user
});

export const userLoginFailed = (loginErrorMsg: IErrorMessage): AppActions => ({
    type: USER_LOGIN_FAILED,
    loginErrorMsg
});

export const startUserLogin = (user: IUser, props: any) => {
    
    let loginService: LoginService = new LoginService(props);
    var loginErrorMsg: IErrorMessage = { text: '', code: '' }
        
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        loginService.login(user.email, user.password).subscribe(
            (data: any) => {
                //props.history.push("/dashboard"); //Success login
                user.isAuthenticated = true;
                return dispatch(userLoginSuccess(user)); 
            }, 
            (error: any) => { 
                loginErrorMsg.text = error.message; //Failed login
                loginErrorMsg.code = error.code;
                return dispatch(userLoginFailed(loginErrorMsg));
            }
        );        
    }
};