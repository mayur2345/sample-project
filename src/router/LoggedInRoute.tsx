import * as React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import history from "./history";
import { AppState } from "../store/configureStore";
import { PATH } from "../properties/paths";


interface IProps {
  exact?: boolean;
  isAuthenticated: boolean | null;
  path: string;
  component: React.ComponentType<any>;
}

const LoggedInRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}: IProps) => {
  let storageAuthString = localStorage.getItem("isAuthenticated");
  let storageAuthBool = (storageAuthString === "true") ? true : false;
  isAuthenticated = storageAuthString ? storageAuthBool : isAuthenticated;

  if (isAuthenticated === false) {
    //history.push(PATH.login);
    console.log("This is a logged in route, you are logged out! Redirected to log in");
  }

  return (
      <Route
        render={otherProps => (
          <>
            <Component {...otherProps} />
          </>
        )}
      />
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.loginState.user.isAuthenticated
});

export default connect(
  mapStateToProps
)(LoggedInRoute);