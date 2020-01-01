import React, { FunctionComponent, Children } from 'react';
import "../../../scss/CustomHeaders.scss"

type Props = {
    text: string
}

export const PageHeader: FunctionComponent<Props> = ({ text }) =>
    <h1 className="pageHeaderText">{text}</h1>