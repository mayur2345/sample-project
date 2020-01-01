/* eslint-disable no-unused-expressions */
import React from 'react';
import "../../../../scss/Spaces.scss";
import { PageHeader } from '../../../Custom/CustomHeaders/PageHeader';
import { Link } from 'react-router-dom';
import { PATH } from '../../../../properties/paths';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Spaces extends React.Component {
    state = {
        spaces: []
    }
    sortSpaces = spaces => {
        return spaces.sort((a, b) => a.name.localeCompare(b.name));
    }
    delete = id => {
        this.setState({
            spaces: this.state.spaces.filter(space => {
                return space.id !== id;
            }),
        });
    }
    publish = index => {
        const spaces = this.state.spaces;
        spaces[index].published = true;
        this.setState({
            spaces,
        });
    }
    unpublish = index => {
        const spaces = this.state.spaces;
        spaces[index].published = false;
        this.setState({
            spaces,
        });
    }
    onActionButtonClick = e => {
        let id = e.target.name;
        let actionButtonMenu = document.getElementById(id+"div");
        if(actionButtonMenu?.classList.contains("displayBlock")) {
            actionButtonMenu.classList.remove("displayBlock");
        } else {
            actionButtonMenu?.classList.add("displayBlock");
        }
    }
    createData(space) {
        let newSpace = {
            id: space.id, 
            name: space.name, 
            address: space.address,
            client: space.client,
            spots: space.spots,
            rating: space.rating,
            published: space.published,
        }
        return newSpace;
    }
    loadSpacesFromAPI = () => {
        const spaces = [];
        spaces.push(this.createData({ id: '#12345', name: 'Hello World', address: 'Smiths of Smithfield, London, UK',  client: 'The Gradient', spots: 10, rating: 4, published: true}));
        spaces.push(this.createData({ id: '#12346', name: 'Nice space', address: 'Smiths of Smithfield, London, UK',  client: 'The Gradient', spots: 10, rating: 4, published: true}));
        spaces.push(this.createData({ id: '#12347', name: 'Good Space', address: 'Smiths of Smithfield, London, UK',  client: 'The Gradient', spots: 10, rating: 4, published: true}));
        spaces.push(this.createData({ id: '#12348', name: 'Amazing space', address: 'Smiths of Smithfield, London, UK',  client: 'The Gradient', spots: 10, rating: 4, published: true}));
        spaces.push(this.createData({ id: '#12349', name: 'fake Space', address: 'Smiths of Smithfield, London, UK',  client: 'The Gradient', spots: 10, rating: 4, published: true}));
        return spaces;
    }
    componentDidMount() {
        const { loadSpacesFromAPI, sortSpaces } = this;
        // Update selected Sidebar menu
        let currentSelectMenu = document.getElementsByClassName("menuSelected");
        currentSelectMenu[0].classList?.remove("menuSelected");
        document.getElementById("menuSpacesId")?.classList.add("menuSelected");

        const spacesFromAPI = loadSpacesFromAPI();
        const sortedSpaces = sortSpaces(spacesFromAPI);
        this.setState({
            spaces: sortedSpaces,
        });
    }
    render() {
        const { spaces } = this.state;
        return (
            <div className="pageWrapper">
                <PageHeader text="Spaces" />

                <div className="row">
                    <div className="col-4">
                        <div className="searchInputWrapper">
                            <input className="searchInput" type="text" placeholder="Search by..."/>
                            <i className="fa fa-search inputIcon"></i>
                        </div>

                    </div>
                    <div className="col-8 p-r-12">
                        <div className="addClientBtnWrapper">
                            <Link to={PATH.addClient}><button className="addClientBtn">Add Space</button></Link>
                        </div>
                        <div className="statusWrapper">
                            <div className="status">
                                <span className="statusSpan1">Status</span>
                                <span className="statusSpan2">All Statuses</span>
                                <div className="fa fa-caret-down statusArrow"></div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="tableWrapper">
                    <TableContainer className="clientsTableContainer">
                        <Table className="clientsTable" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Space ID</TableCell>
                                    <TableCell>Space name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Client</TableCell>
                                    <TableCell># of spots</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {spaces.map((space, index) => (
                                    <TableRow key={space.id}>
                                        <TableCell component="th" scope="row">
                                            {space.id}
                                        </TableCell>
                                        <TableCell>{space.name}</TableCell>
                                        <TableCell>{space.address}</TableCell>
                                        <TableCell>{space.client}</TableCell>
                                        <TableCell>{space.spots}</TableCell>
                                        <TableCell>{space.rating}</TableCell>
                                        <TableCell>{space.published ? <button className="statusButton">Published</button> : <button className="statusButton">Unpublished</button> }</TableCell>
                                        <TableCell>
                                            <button name={space.id} id={space.id} className="fa fa-ellipsis-v actionButton" value={space.status} onClick={this.onActionButtonClick}>
                                                <div className="dropdown-content actionDropdown" id={space.id+"div"}>
                                                    <Link className="actionDropdownElement" to="#">Edit</Link>
                                                    { space.published ? <div className="actionDropdownElement" onClick={() => { this.unpublish(index) }}>Unpublish</div> : <div onClick={() => { this.publish(index) }} className="actionDropdownElement">Publish</div>}
                                                    { space.published ? <div className="actionDropdownElement" onClick={this.preview}>Preview</div> : null}
                                                    <div className="actionDropdownElement" onClick={() => { this.delete(space.id) }}>Delete</div>
                                                </div>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>    
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    };
};

export default Spaces;