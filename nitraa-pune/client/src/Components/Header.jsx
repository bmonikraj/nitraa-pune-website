import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MediaQuery from 'react-responsive';
import MaterialIcons from 'material-icons-react';
import Container from 'react-bootstrap/Container';

import '../font.css';

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            profileURL : "/",
            profileTab : "Dashboard"
        }
    }

    componentDidMount(){
        if(localStorage.getItem('profile')){
            if(localStorage.getItem('profile')=='admin'){
                this.setState({profileURL : '/admin-dashboard'});
            }
            if(localStorage.getItem('profile')=='moderator'){
                this.setState({profileURL : '/moderator-dashboard'});
            }
            if(localStorage.getItem('profile')=='user'){
                this.setState({profileURL : '/profile'});
                this.setState({profileTab : "Profile"});
            }
        }
    }

    render(){

        const itemStyle = {
            display:"inline-flex",
            verticleAlign:"middle",
            fontWeight: "bold",
        }

        const itemStyleLogin = {
            display:"inline-flex",
            verticleAlign:"middle",
            fontWeight: "bold",
            display : localStorage.getItem('authtoken')?"none":"block"
        }

        const itemStyleProfile = {
            display:"inline-flex",
            verticleAlign:"middle",
            fontWeight: "bold",
            display : localStorage.getItem('authtoken')?"block":"none"
        }

        const itemStyleLogout = {
            display:"inline-flex",
            verticleAlign:"middle",
            fontWeight: "bold",
            display : localStorage.getItem('authtoken')?"block":"none"
        }

        function logoutFunc(){
            localStorage.removeItem('authtoken');
            localStorage.removeItem('profile');
            window.open("/", "_self");
        }

        return (
                <Container>
                    <Navbar collapseOnSelect expand="md" bg="light" fixed="top">
                        <Navbar.Brand href="/">
                            <MediaQuery query="(min-device-width : 768px)">
                                <img
                                src={process.env.PUBLIC_URL + 'images/favicon.png'}
                                alt="NITRAA PUNE"
                                className="d-inline-block align-top"
                                width="50"
                                height="50"
                                />
                                <Navbar.Text style={
                                    {fontFamily: 'Anton', paddingLeft: 20, fontSize:30}
                                    }>
                                        NITRAA | PUNE
                                </Navbar.Text>
                            </MediaQuery>
                            <MediaQuery query="(max-device-width : 768px)">
                                <img
                                src={process.env.PUBLIC_URL + 'images/favicon.png'}
                                alt="NITRAA PUNE"
                                className="d-inline-block align-top"
                                width="40"
                                height="40"
                                />
                                <Navbar.Text style={
                                    {fontFamily: 'Anton', paddingLeft: 60, fontSize:20}
                                    }>
                                        NITRAA | PUNE
                                </Navbar.Text>
                            </MediaQuery>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="/bolo" style={itemStyle} >
                                <MaterialIcons icon="info"/>&nbsp;About Us
                            </Nav.Link>
                            <Nav.Link href="#pricing" style={itemStyle}>
                                <MaterialIcons icon="people"/>&nbsp;Community
                            </Nav.Link>
                            <Nav.Link href="/gallery" style={itemStyle}>
                                <MaterialIcons icon="photo"/>&nbsp;Gallery
                            </Nav.Link>
                            <NavDropdown title="Initiatives" id="collasible-nav-dropdown" style={itemStyle}>
                                <NavDropdown.Item href="/events" style={itemStyle}>
                                    <MaterialIcons icon="event"/>&nbsp;Events
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/jobs" style={itemStyle}>
                                    <MaterialIcons icon="school"/>&nbsp;Careers
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.3" style={itemStyle}>
                                    <MaterialIcons icon="attach_money"/>&nbsp;Benefit Projects
                                </NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                            <Nav>
                            <Nav.Link href="#deets" style={itemStyle}>
                                <MaterialIcons icon="person_pin_circle"/>&nbsp;Alumni Nearby
                            </Nav.Link>
                            <Nav.Link href={this.state.profileURL} style={itemStyleProfile} ref="login_link">
                                &nbsp;{this.state.profileTab}
                            </Nav.Link>
                            <Nav.Link href="/login" style={itemStyleLogin} ref="login_link">
                                &nbsp;Login
                            </Nav.Link>
                            <Nav.Link onClick={logoutFunc} style={itemStyleLogout} ref="logout_link">
                                &nbsp;Logout
                            </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                </Navbar>
                </Container>
        );
    }
}

export default Header;
