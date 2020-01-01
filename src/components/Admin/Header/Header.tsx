import React from 'react';
import '../../../scss/Header.scss'

interface IHeaderProps {

}

interface IHeaderState {

}

class Header extends React.Component<IHeaderProps, IHeaderState> {

    render() {
        return( 
            <header className="headerWrapper">
                <img className="headerLogo" alt=""></img>
                <div className="verticalLine"></div>
                <div className="userImgWrapper">
                    {/*<img className="userImg">
                    </img>
                    <div className="imgMask"></div>
                    */ }
                </div>

                <div className="notificationWrapper">
                    <div className="notification">
                        <div className="rectangle"><p className="notificationNum">5</p></div>
                    </div>
                </div>
                <div className="location">
                    <div className="locationText">London, UK</div>
                    <div className="fa fa-caret-down arrow"></div>
                </div>



            </header>
        )
    }

}

export default Header;