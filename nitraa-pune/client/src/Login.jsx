import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';
import Header from './Components/Header';
import Footer from './Components/Footer';

class Login extends React.Component{
    render(){
        const formStyle = {
            marginTop : "23vh"
        }
        const formLabelStyle = {
            color : "#ffffff"
        }
        return(
            <Container>
                <Header/>
                <Form style={formStyle}>
                    <Row>
                        <Col xs={12} md={{span:6 , offset: 3}}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={formLabelStyle}>Email address </Form.Label>
                                <Form.Control type="email" placeholder="For unique identification" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={{span:6 , offset:3}}>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={formLabelStyle}>Password</Form.Label>
                                <Form.Control type="password" placeholder="For secure access" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{span:6 , offset:3}}>
                            <Row>
                                <Col>
                                    <Button variant="primary" type="submit">
                                        Submit 
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit">
                                        Recover 
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit">
                                        Register 
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{paddingTop : 20}}>
                        <Col xs={12} md={{span:6 , offset:3}}>
                            <Form.Label style={formLabelStyle}>Login in one click with</Form.Label>
                            <Row>
                                <Col>
                                    <SocialIcon url="https://facebook.com" network="facebook" bgColor="#ffffff"/>
                                </Col>
                                <Col>
                                    <SocialIcon url="https://linkedin.com" network="linkedin" bgColor="#ffffff"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
                <Footer/>
            </Container>
        )
    }
}

export default Login;