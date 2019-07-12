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
            verticleAlign:"middle",
            fontWeight: "bold",
            display : localStorage.getItem('authtoken')?"none":"inline-flex"
        }

        const itemStyleProfile = {
            verticleAlign:"middle",
            fontWeight: "bold",
            display : localStorage.getItem('authtoken')?"inline-flex":"none"
        }

        const itemStyleLogout = {
            verticleAlign:"middle",
            fontWeight: "bold",
            display : localStorage.getItem('authtoken')?"inline-flex":"none"
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
                            <Nav.Link href="/about-us" style={itemStyle} >
                                <MaterialIcons icon="info"/>&nbsp;About Us
                            </Nav.Link>
                            <Nav.Link href="/executive-council" style={itemStyle}>
                                <MaterialIcons icon="people"/>&nbsp;Executive Council
                            </Nav.Link>
                            <Nav.Link href="/gallery" style={itemStyleLogout}>
                                <MaterialIcons icon="photo"/>&nbsp;Gallery
                            </Nav.Link>
                            <Nav.Link href="/events-list" style={itemStyleLogout}>
                                <MaterialIcons icon="event"/>&nbsp;Events
                            </Nav.Link>
                            <Nav.Link href="/blogs-list" style={itemStyleLogout}>
                                <MaterialIcons icon="subtitles"/>&nbsp;Blogs
                            </Nav.Link>
                            <Nav.Link href="/jobs-list" style={itemStyleLogout}>
                                <MaterialIcons icon="school"/>&nbsp;Careers
                            </Nav.Link>
                            </Nav>
                            <Nav>
                            <Nav.Link href="/members-dir" style={itemStyleLogout}>
                                <MaterialIcons icon="perm_identity"/>&nbsp;Members Directory
                            </Nav.Link>
                            <Nav.Link href={this.state.profileURL} style={itemStyleProfile} ref="login_link">
                                &nbsp;{this.state.profileTab}
                            </Nav.Link>
                            <Nav.Link href="/login" style={itemStyleLogin} ref="login_link">
                                <MaterialIcons icon="power_settings_new"/>&nbsp;Login
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
