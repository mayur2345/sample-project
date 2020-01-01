import React, { FunctionComponent } from 'react';
import "../../../scss/CustomInputs.scss";


type Props = {
    spanText: string,
    name: string,
    type: string,
    onChange: any,
    value: any
}

export const PrimaryInput: FunctionComponent<Props> = ({ spanText, name, type, onChange, value }) =>
    <div className="primaryInputDiv">
                <span className="firstNameSpan">{spanText}</span>

        <input className="firstNameInput" type={type} name={name} onChange={onChange} value={value}></input>
    </div>

