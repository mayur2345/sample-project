/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import '../../../../scss/Clients.scss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PATH } from '../../../../properties/paths';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../../Custom/CustomHeaders/PageHeader';

class Clients extends Component {
    clients = [
        this.createData('0000000', "Patty Massey", "The Gradient", "pattymassey@gmail.com", true, 12, "Yaroslav Prubniak"),
        this.createData('0000001', "Patty Massey", "The Gradient", "pattymassey@gmail.com", false, 12, "Yaroslav Prubniak"),
        this.createData('0000002', "Patty Massey", "The Gradient", "pattymassey@gmail.com", true, 12, "Yaroslav Prubniak"),
        this.createData('0000003', "Patty Massey", "The Gradient", "pattymassey@gmail.com", false, 12, "Yaroslav Prubniak"),
        this.createData('0000004', "Patty Massey", "The Gradient", "pattymassey@gmail.com", true, 12, "Yaroslav Prubniak"),
        // this.createData('0000005', "Patty Massey", "The Gradient", "pattymassey@gmail.com", false, 12, "Yaroslav Prubniak"),
        // this.createData('0000006', "Patty Massey", "The Gradient", "pattymassey@gmail.com", true, 12, "Yaroslav Prubniak"),
        // this.createData('0000007', "Patty Massey", "The Gradient", "pattymassey@gmail.com", false, 12, "Yaroslav Prubniak"),
        // this.createData('0000008', "Patty Massey", "The Gradient", "pattymassey@gmail.com", true, 12, "Yaroslav Prubniak"),
        // this.createData('0000009', "Patty Massey", "The Gradient", "pattymassey@gmail.com", true, 12, "Yaroslav Prubniak"),
        // this.createData('0000010', "Patty Massey", "The Gradient", "pattymassey@gmail.com", false, 12, "Yaroslav Prubniak"),
        this.createData('0000011', "Patty Massey", "The Gradient", "pattymassey@gmail.com", true, 12, "Yaroslav Prubniak")
    ];

    createData(id, fullName, company, email, status, numberOfSpaces, accountManager) {
        return { id, fullName, company, email, status, numberOfSpaces, accountManager };
    }

    onActionButtonClick = (e) => {
        // let status = e.target.value;
        let id = e.target.name;
        let actionButtonMenu = document.getElementById(id+"div");
        if(actionButtonMenu?.classList.contains("displayBlock")) {
            actionButtonMenu.classList.remove("displayBlock");
        } else {
            actionButtonMenu?.classList.add("displayBlock");
        }
    }

    componentDidMount() {
        // Update selected Sidebar menu
        let currentSelectMenu = document.getElementsByClassName("menuSelected");
        currentSelectMenu[0].classList?.remove("menuSelected");
        document.getElementById("menuClientsId")?.classList.add("menuSelected");
    }

    render() {
        return(
            <div className="pageWrapper">
                
                <PageHeader text="Clients"/>
                
                <div className="row">
                    <div className="col-4">
                        <div className="searchInputWrapper">
                            {/* <span className="inputLabel">Search by...</span> */}
                            <input className="searchInput" type="text" placeholder="Search by..."/>
                            <i className="fa fa-search inputIcon"></i>
                        </div>
                    </div>

                    <div className="col-8 p-r-12">
                        <div className="addClientBtnWrapper">
                            <Link to={PATH.addClient}><button className="addClientBtn">Add client</button></Link>
                        </div>
                        <div className="statusWrapper">
                            <div className="status">
                                <span className="statusSpan1">Status</span>
                                <span className="statusSpan2">All Statuses</span>
                                <div className="fa fa-caret-down statusArrow"></div>
                            </div>
                        </div>
                        <div className="accountManagerWrapper">
                            <div className="accountManager">
                                <span className="accountManagerSpan1">Account manager</span>
                                <span className="accountManagerSpan2">All Managers</span>
                                <div className="fa fa-caret-down accountManagerArrow"></div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="tableWrapper">
                    <TableContainer className="clientsTableContainer">
                        <Table className="clientsTable" aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Client ID</TableCell>
                                <TableCell>Full name</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell># of spaces</TableCell>
                                <TableCell>Account manager</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.clients.map(client => (
                                <TableRow key={client.id}>
                                <TableCell component="th" scope="row">
                                    {client.id}
                                </TableCell>
                                <TableCell>{client.fullName}</TableCell>
                                <TableCell>{client.company}</TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell>{client.status ? <button className="statusButton">Active</button> : <button className="statusButton">Not active</button> }</TableCell>
                                <TableCell className="p-l-3">{client.numberOfSpaces}</TableCell>
                                <TableCell>{client.accountManager} <button name={client.id} id={client.id} className="fa fa-ellipsis-v actionButton" value={client.status} onClick={this.onActionButtonClick}>
                                <div className="dropdown-content actionDropdown" id={client.id+"div"}>
                                    <Link className="actionDropdownElement" to="#">Edit</Link>
                                    { client.status ? <div className="actionDropdownElement">Activate</div> : <div className="actionDropdownElement">Deactivate</div>}
                                    <div className="actionDropdownElement">Delete</div>
                                </div>
                                    </button></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>    
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}

export default Clients;