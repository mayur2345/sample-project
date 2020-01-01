import React from 'react';
import {  Router, Route, Redirect, Switch } from "react-router-dom";
import Login from '../components/Login/Login';
import AdminHome from '../components/Admin/AdminHome';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import history from './history';
import LoggedInRoute from './LoggedInRoute';
import { PATH } from '../properties/paths';


const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route path={PATH.login} component={ Login }></Route>
            <LoggedInRoute path={PATH.clients} component= { AdminHome }></LoggedInRoute>
            <LoggedInRoute path={PATH.spaces} component= { AdminHome }></LoggedInRoute>

            <Route path={PATH.resetPassword} component = {ResetPassword}></Route>
            <Redirect from={PATH.home} to={PATH.login}></Redirect>
          </Switch>
    </Router>
);

export default AppRouter;

