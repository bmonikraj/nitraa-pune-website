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

class Login extends React.Component{

    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLoginAlertClose = this.handleLoginAlertClose.bind(this);
        this.handleLoginAlertOpen = this.handleLoginAlertOpen.bind(this);
        this.state = {
            loginAlertShow : false,
            loginAlertText : ""
        }
    }

    handleLoginAlertOpen(){
        this.setState({loginAlertShow : true});
    }

    handleLoginAlertClose(){
        this.setState({loginAlertShow : false});
        this.email.value = "";
        this.password.value = "";
    }

    handleLogin(event){
        if(event.target.value == 'login'){
            if(this.email.value.split("@")[1] == 'nitraa.pune'){
                if(this.email.value.split("@")[0] == 'admin'){
                    var _self_parent = this;
                    axios({
                        method : 'post',
                        url : '/login-admin',
                        data : {
                            email : this.email.value,
                            password : this.password.value
                        }
                    })
                    .then(function(response){
                        if (response.data.status == 'success'){
                            
                            window.open("/", "_self");
                            localStorage.setItem('authtoken',response.headers.authtoken);
                        }
                        else{
                            _self_parent.setState({loginAlertText : response.data.message});
                            _self_parent.handleLoginAlertOpen();
                        }
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }
                else{
                    console.log('moderator login');
                }
            }
            else{
                console.log("User Login");
            }
        }   
        else if(event.target.value == 'recover'){

        }   
        else{

        } 
    }

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
                                <Form.Control type="email" placeholder="For unique identification" ref={email => this.email = email}/>
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
                                <Form.Control type="password" placeholder="For secure access" ref={password => this.password = password}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{span:6 , offset:3}}>
                            <Row>
                                <Col xs={2}>
                                    <Button variant="primary" value="login" onClick={this.handleLogin}>
                                        Submit 
                                    </Button>
                                </Col>
                                <Col xs={{span:2, offset:2}}>
                                    <Button variant="primary" value="recover" onClick={this.handleLogin}> 
                                        Recover 
                                    </Button>
                                </Col>
                                <Col xs={{span:2, offset:2}}>
                                    <Button variant="primary" value="register" onClick={this.handleLogin}>
                                        Register 
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{paddingTop : 20}}>
                        <Col xs={12} md={{span:6 , offset:3}}>
                            <Form.Label style={formLabelStyle}>One click login with</Form.Label>
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
                <Sweetalert danger confirmBtnText="I Understand" confirmBtnBsStyle="danger" title="Authentication Error" show = {this.state.loginAlertShow} onConfirm = {this.handleLoginAlertClose}>
                    {this.state.loginAlertText}
                </Sweetalert>
                <Footer/>
            </Container>
        )
    }
}

export default Login;