
import React from 'react';
import { CognitoUserPool, /*CognitoUserAttribute,*/ CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
(window as any).process = { browser: true };
AWS.EventListeners['Core'].removeListener('afterBuild', AWS.EventListeners['Core']['removeListener']);


interface ILoginServiceProps {
    history: any;
}

interface ILoginServiceState {

}

export class LoginService extends React.Component<ILoginServiceProps, ILoginServiceState> {
    constructor(props: ILoginServiceProps) {
        super(props)
    }

    POOL_DATA = {
        UserPoolId: environment.cogintoValues.UserPoolId,
        ClientId: environment.cogintoValues.ClientId
    };
    userPool = new CognitoUserPool(this.POOL_DATA);

    cognitoUser: any;
    userAttributes: any;

    getAuthenticatedUser() {
        return this.userPool.getCurrentUser();
    }

    logout() {
        let authUser = this.getAuthenticatedUser();
        if(authUser) {
            authUser.signOut();
            localStorage.clear();
        }
    }

    updatePassword = (newPassword: string) => {
        return Observable.create((obs: any) => {
            this.cognitoUser.completeNewPasswordChallenge(newPassword, this.userAttributes, {
                onSuccess: (result: any) => {
                    obs.next(result);
                    obs.complete();
                },
                onFailure: (error: any) => {
                    obs.error(error);
                }

            });
        });
    }

     login(username: string, password: string) {
        localStorage.clear();
        
        const authData = { Username: username, Password: password };
        const authDetails = new AuthenticationDetails(authData);

        const userData = { Username: username, Pool: this.userPool }
        this.cognitoUser = new CognitoUser(userData);

        return Observable.create((obs: any) => {
            let that = this;
            this.cognitoUser.authenticateUser(authDetails, {
                onSuccess(result: CognitoUserSession) {
                    obs.next(result);
                    obs.complete();
                },
                onFailure(error: any) {
                    obs.error(error);
                },
                newPasswordRequired(userAttributes: any, requiredAttributes: any) {
                    that.userAttributes = userAttributes;
                    that.props.history.push("reset-password");
                }
            });
        });
    }
}
