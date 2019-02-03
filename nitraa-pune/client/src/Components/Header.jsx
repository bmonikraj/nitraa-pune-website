import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

class Header extends Component{
    render(){
        const fullHorizontalDiv = {
            background : "#aaaaaa",
            width: "100%"
        }
        const linksDesktop = {
            color : "#ffffff", 
            fontWeight : "bold",
            width : "16.66%", 
            float : "right",
            textAlign : "center"
        }
        const linksMobile = {
            color : "#ffffff",
            fontWeight : "bold",
            width : "100%",
            textAlign : "center"
        }
        return(
            <div style={fullHorizontalDiv}>
                <MediaQuery query="(min-device-width:769px)">
                    <div style={linksDesktop}>
                        Login
                    </div>
                    <div style={linksDesktop}>
                        Alumni Nearby
                    </div>
                </MediaQuery>
                <MediaQuery query="(max-device-width:768px)">
                    <div style={linksMobile}>
                        Alumni Nearby
                    </div>
                    <div style={linksMobile}>
                        Login
                    </div>
                </MediaQuery>
            </div>
        )
    }
}
export default Header;