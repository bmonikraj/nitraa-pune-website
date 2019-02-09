import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import MediaQuery from 'react-responsive';
import MaterialIcons from 'material-icons-react';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../font.css';

class Footer extends React.Component{
    render(){
        const itemStyle = {
            display:"inline-flex", 
            verticleAlign:"middle",
            fontSize: "small",
            fontWeight: "bold"
        }
        return (
            <Container>
                <Navbar bg="light" fixed="bottom">
                    
                        <MediaQuery query="(min-device-width: 769px)">
                            <Row style={{paddingLeft : "35%"}}>
                                <Col xs={{span: 1, offset:1}}>
                                    <Nav.Link href="#">
                                        <OverlayTrigger
                                        key="top"
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`Contact Us`}>
                                                Contact Us
                                            </Tooltip>
                                        }
                                        >
                                            <MaterialIcons icon="call" size="small"/>
                                        </OverlayTrigger>
                                    </Nav.Link>
                                </Col>
                                <Col xs={{span:1, offset:1}}>
                                    <Nav.Link href="#">
                                            <OverlayTrigger
                                            key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id={`FAQ`}>
                                                    Frequently Asked Questions
                                                </Tooltip>
                                            }
                                            >
                                                <MaterialIcons icon="help" size="small"/>
                                            </OverlayTrigger>
                                    </Nav.Link>
                                </Col>
                                <Col xs={{span:1, offset:1}}>
                                    <Nav.Link href="#">
                                            <OverlayTrigger
                                            key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id={`Privacy Policy`}>
                                                    Privacy Policy
                                                </Tooltip>
                                            }
                                            >
                                                <MaterialIcons icon="phonelink_lock" size="small"/>
                                            </OverlayTrigger>
                                    </Nav.Link>
                                </Col>
                                <Col xs={{span:1, offset:1}}>
                                    <Nav.Link href="#" style={itemStyle}>
                                            <OverlayTrigger
                                            key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id={'Terms Of Usage'}>
                                                    Terms Of Usage
                                                </Tooltip>
                                            }
                                            >
                                                <MaterialIcons icon="ballot" size="small"/>
                                            </OverlayTrigger>
                                    </Nav.Link>
                                </Col>
                            </Row>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 768px)">
                            <Row>
                                <Col xs={12}>
                                <Row style={{paddingLeft : "35%"}}>
                                    <Col xs={{span:3}}>
                                        <MaterialIcons icon="call" size="small"/>
                                    </Col>
                                    <Col xs={3}>
                                        <MaterialIcons icon="help" size="small"/>                                        
                                    </Col>
                                    <Col xs={3}>
                                        <MaterialIcons icon="phonelink_lock" size="small"/>                                        
                                    </Col>
                                    <Col xs={3}>
                                        <MaterialIcons icon="ballot" size="small"/>                                       
                                    </Col>
                                </Row>
                                </Col>
                            </Row>
                        </MediaQuery>
                    
                </Navbar>
            </Container>
        )
    }
}

export default Footer;