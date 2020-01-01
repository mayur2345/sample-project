import React, {FunctionComponent} from 'react'
import '../../../scss/CustomButtons.scss';

type Props = {
    text: string,
    name: string,
    onClick: any
}

export const SecondaryButton: FunctionComponent<Props> = ({text, name, onClick}) =>
    <button className="secondaryButton" name={name} onClick={onClick}>{text}</button>
