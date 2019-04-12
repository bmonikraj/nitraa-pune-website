import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';
import Sweetalert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleRegisterAlertClose = this.handleRegisterAlertClose.bind(this);
        this.handleRegisterAlertOpen = this.handleRegisterAlertOpen.bind(this);
        this.state = {
            RegisterAlertShow: false,
            RegisterAlertText: ""
        }
    }

    handleRegisterAlertOpen() {
        this.setState({ RegisterAlertShow: true });
    }

    handleRegisterAlertClose() {
        this.setState({ RegisterAlertShow: false });
        this.email.value = "";
        this.password.value = "";
        this.alumniname.value = "";
        this.cnfpassword.value = "";
        this.mobilenumber.value = "";
    }

    handleRegister(event) {
        console.log(event.target);
        if (event.target.value == 'register' && this.password.value === this.cnfpassword.value) {
            
                var _self_parent = this;
                axios({
                    method: 'post',
                    url: '/signup-user',
                    data: {
                        email: this.email.value,
                        password: this.password.value,
                        name: this.alumniname.value,
                        phone: this.mobilenumber.value
                    }
                })
                    .then(function (response) {
                        if (response.data.status == 'success') {

                            _self_parent.setState({ RegisterAlertText: response.data.message });
                            _self_parent.handleRegisterAlertOpen();
                            
                        }
                        else {
                            _self_parent.setState({ RegisterAlertText: response.data.message });
                            _self_parent.handleRegisterAlertOpen();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            
        }
        else{
            _self_parent.setState({ RegisterAlertText: "Password is not matching confirm password" });
            _self_parent.handleRegisterAlertOpen();
        }

    }

    render() {
        const formStyle = {
            marginTop: "23vh", 
            marginBottom:"23vh"
        }
        const formLabelStyle = {
            color: "#ffffff"
        }
        return (
            <Container>
                <Header />
                <Form style={formStyle}>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={formLabelStyle}>Email address </Form.Label>
                                <Form.Control type="email" placeholder="For unique identification" ref={email => this.email = email} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="formBasicText">
                                <Form.Label style={formLabelStyle}>Name</Form.Label>
                                <Form.Control type="text" placeholder="Please enter your name" ref={alumniname => this.alumniname = alumniname} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="formBasicText">
                                <Form.Label style={formLabelStyle}>Mobile</Form.Label>
                                <Form.Control type="number" placeholder="Please enter your mobile number" ref={mobilenumber => this.mobilenumber = mobilenumber} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={formLabelStyle}>Password</Form.Label>
                                <Form.Control type="password" placeholder="For secure access" ref={password => this.password = password} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={formLabelStyle}>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm your password" ref={cnfpassword => this.cnfpassword = cnfpassword} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Row>
                                <Col xs={2}>
                                    <Button variant="primary" value="register" onClick={this.handleRegister}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: 20 }}>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Label style={formLabelStyle}>One click Register with</Form.Label>
                            <Row>
                                <Col>
                                    <SocialIcon url="http://localhost:3001/auth/facebook" network="facebook" bgColor="#ffffff" />
                                </Col>
                                <Col>
                                    <SocialIcon url="http://localhost:3001/auth/google" network="google" bgColor="#ffffff" />
                                </Col>
                                <Col>
                                    <SocialIcon url="http://localhost:3001/auth/linkedin" network="linkedin" bgColor="#ffffff" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
                <Sweetalert confirmBtnText="I Understand" confirmBtnBsStyle="primary" title="Registration" show={this.state.RegisterAlertShow} onConfirm={this.handleRegisterAlertClose}>
                    {this.state.RegisterAlertText}
                </Sweetalert>
                <Footer />
            </Container>
        )
    }
}

export default Register;