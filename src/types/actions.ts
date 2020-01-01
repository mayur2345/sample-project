import { IUser } from "./User";
import { IErrorMessage } from "./ErrorMessage";

// action strings
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";



export interface IUserLoginActionSuccess {
    type: typeof USER_LOGIN_SUCCESS,
    user: IUser
}

export interface IUserLoginActionFailed {
    type: typeof USER_LOGIN_FAILED,
    loginErrorMsg: IErrorMessage
}

export type UserActionTypes = IUserLoginActionSuccess | IUserLoginActionFailed;

export type AppActions = UserActionTypes;