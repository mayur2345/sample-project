import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Clients from './Pages/Clients/Clients';
import Spaces from './Pages/Spaces/Spaces';
import { Route } from "react-router-dom";
import { PATH } from '../../properties/paths';
import AddClient from './Pages/Clients/AddClient';

class AdminHome extends React.Component {
    render() {
        return (
            <div>
                <Route path={PATH.clients} component={Clients}></Route>
                <Route path={PATH.addClient} component={AddClient}></Route>

                <Route path={PATH.spaces} component={Spaces}></Route>

                <Sidebar></Sidebar>
                <Header></Header>
            </div>
        )
    }

}

export default AdminHome;

