import React from 'react';
import "../../../../scss/AddClient.scss";
import { PATH } from '../../../../properties/paths';
import { ButtonPageHeader } from '../../../Custom/CustomHeaders/ButtonPageHeader';
import { PrimaryInput } from '../../../Custom/CustomInputs/PrimaryInput';
import { FormControlLabel } from '@material-ui/core';
import CustomCheckbox from '../../../Custom/CustomCheckboxes/CustomCheckbox';
import { PrimaryButton } from '../../../Custom/CustomButtons/PrimaryButton';
import { SecondaryButton } from '../../../Custom/CustomButtons/SecondaryButton';

class AddClient extends React.Component {
    state = {
        firstName: "",
            lastName: "",
            phone: "",
            email: "",
            secondEmail: "",
            companyName: "",
            accountManager: "",
            contractId: "",    
            isChecked:false
    }

    onCheckboxChange = e => {
        let checked = e.target.checked;
        this.setState({isChecked: checked});
    }

    onInputChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        switch (name) {
            case 'firstName': {
                this.setState({firstName: value});
                break;
            }
            case 'lastName': {
                this.setState({lastName: value});
                break;
            }
            case 'phone': {
                this.setState({phone: value});
                break;
            }
            case 'email': {
                this.setState({email: value});
                break;
            }
            case 'secondEmail': {
                this.setState({secondEmail: value});
                break;
            }
            case 'companyName': {
                this.setState({companyName: value});
                break;
            }
            case 'accountManager': {
                this.setState({accountManager: value});
                break;
            }
            case 'contractId': {
                this.setState({contractId: value});
                break;
            }
            default:
                return;
        }
    }

    onSave = e => {
        let client;
        client = {firstName: this.state.firstName, lastName: this.state.lastName, phone: this.state.phone, 
            email: this.state.email, secondEmail: this.state.secondEmail, companyName: this.state.companyName, 
            accountManager: this.state.accountManager, contractId: this.state.contractId};
        console.log(client);
    }

    onCancel = e => {
        console.log("Cancel clicked!");
    }



    render() {
        return (
            <div className="pageWrapper">
                <ButtonPageHeader text="Add client" backPath={PATH.clients} />
                <div className="horizontalLine"></div>

                <div className=" flexContainer">
                    <h3 className="addClientGroupName">Contact person</h3>
                    <div className="addClientInputsWrapper">
                        <div className="flexContainer row m-0">
                            <div className="firstNameDiv col">
                                <PrimaryInput type="text" spanText="First name *" name="firstName" onChange={this.onInputChange} value={this.state.firstName}></PrimaryInput>
                            </div>
                            {/* <div className="lastNameDiv col">
                                <input className="lastNameInput" type="text"></input>
                                <span className="lastNameSpan">Last Name *</span>
                            </div> */}
                            <div className="secondNameDiv col">
                                <PrimaryInput type="text" spanText="Last name *" name="lastName" onChange={this.onInputChange} value={this.state.lastName}></PrimaryInput>
                            </div>
                        </div>
                        <div className="p-t-075 col">
                                <PrimaryInput type="text" spanText="Phone" name="phone" onChange={this.onInputChange} value={this.state.phone}></PrimaryInput>
                        </div>

                        <div className="p-t-075 col">
                                <PrimaryInput type="email" spanText="Email *" name="email" onChange={this.onInputChange} value={this.state.email}></PrimaryInput>
                        </div>

                        <div className="p-t-075 col">
                            <p className="anotherEmailText">
                            On this email address a link for inital Super Admin account activation will be sent.
                            This email address will also be used as a login for the initial Super Admin account.
                            </p>
                        </div>
                        <div className="p-t-075 col">
                            <FormControlLabel
                            control={
                                <CustomCheckbox onChange={this.onCheckboxChange} />
                                }
                                className="checkboxLabel"
                                label="Use another email address as a login for the initial Super Admin account">
                            </FormControlLabel>
                        </div>

                        {this.state.isChecked ? <div className="col">
                                <PrimaryInput type="email" spanText="Email *" name="secondEmail" onChange={this.onInputChange} value={this.state.secondEmail}></PrimaryInput>
                        </div> : null}
                    </div>
                </div>

                <div className="smallHorizontalLine"></div>

                <div className="addClientCompany flexContainer">
                    <h3 className="addClientGroupName">Company</h3>
                    <div className="addCompanyInputsWrapper">
                        <div className="col">
                            <PrimaryInput type="text" spanText="Company name *" name="companyName" onChange={this.onInputChange} value={this.state.companyName}></PrimaryInput>
                        </div>
                        <div className="p-t-075 col">
                            <PrimaryInput type="text" spanText="Account Manager *" name="accountManager" onChange={this.onInputChange} value={this.state.accountManager}></PrimaryInput>
                        </div>
                        <div className="p-t-075 col">
                            <PrimaryInput type="text" spanText="Contract ID" name="contractId" onChange={this.onInputChange} value={this.state.contractId}></PrimaryInput>
                        </div>
                    </div>
                </div>

                <div className="smallHorizontalLine"></div>
                
                <div className="lineWrapper">
                    <div className="fullHorizontalLine"></div>
                </div>
                

                <div className="buttonsWrapper flexContainer">

                    <SecondaryButton name="cancelBtn" text="Cancel" onClick={this.onCancel}></SecondaryButton>

                    <PrimaryButton name="saveBtn" text="Save" onClick={this.onSave}></PrimaryButton>
                </div>

            </div>            
        )
    }

}

export default AddClient;