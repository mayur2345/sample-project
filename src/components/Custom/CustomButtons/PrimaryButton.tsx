import React, {FunctionComponent} from 'react'
import '../../../scss/CustomButtons.scss';

type Props = {
    text: string,
    name: string,
    onClick: any
}

export const PrimaryButton: FunctionComponent<Props> = ({text, name, onClick}) =>
    <button className="primaryButton" name={name} onClick={onClick}>{text}</button>
