import { IUser } from '../types/User';
import { UserActionTypes, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED } from '../types/actions';
import { IErrorMessage } from '../types/ErrorMessage';


interface ILogin {
    user: IUser,
    loginErrorMsg: IErrorMessage
    
}

const loginReducerDefaultState: ILogin = {
    user: {
        email: "",
        password: "",
        isAuthenticated: false
    },
    loginErrorMsg : {
        text: "",
        code: ""
    }
};

const loginReducer = (
    state = loginReducerDefaultState,
    action: UserActionTypes
): ILogin => {
    
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
                state = {
                    user: {
                        email: action.user.email,
                        password: action.user.password,
                        isAuthenticated: true
                    },
                    loginErrorMsg: {
                        text: "",
                        code: ""
                    }
                }
            return {...state, ...action};
        case USER_LOGIN_FAILED:
                state = {
                    user: {
                        email: "",
                        password: "",
                        isAuthenticated: false
                    },
                    loginErrorMsg: {
                        text: action.loginErrorMsg.text,
                        code: action.loginErrorMsg.code
                    }
                }
            return {...state, ...action};
        default:
            return state;
    }
};

export { loginReducer };