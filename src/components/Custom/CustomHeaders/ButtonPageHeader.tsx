import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import "../../../scss/CustomHeaders.scss"


type Props = {
    text: string,
    backPath: string
}

export const ButtonPageHeader: FunctionComponent<Props> = ({ text, backPath }) =>
    <Link to={backPath}>
        <div className="flexContainer">
            <i className="fa fa-arrow-circle-left arrowBack"></i>
            <h1 className="pageHeaderTextWithArrow">{text}</h1>
        </div>
    </Link>