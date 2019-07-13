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
import GoogleLogin from 'react-google-login';
import FacebookProvider, {Login} from 'react-facebook-sdk';
import queryString from 'query-string';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLoginAlertClose = this.handleLoginAlertClose.bind(this);
        this.handleLoginAlertOpen = this.handleLoginAlertOpen.bind(this);
        this.state = {
            loginAlertShow: false,
            loginAlertText: "",
            loginAlertType: "danger",
            loginAlertConfirmButton: "I Understand"
        }
    }

    componentDidMount()
    {
        var params = queryString.parse(this.props.location.search);
        if(params.message)
        {
            this.setState({
                loginAlertShow: true,
                loginAlertType: "danger",
                loginAlertText: params.message,
                loginAlertConfirmButton: "I Understand"
            });
        }
    }

    handleLoginAlertOpen() {
        this.setState({ loginAlertShow: true });
    }

    handleLoginAlertClose() {
        this.setState({ loginAlertShow: false });
        if(this.state.loginAlertType === "success"){
          window.open("/", "_self");
        }
    }

    handleLogin(event) {
        console.log(event.target);
        if (event.target.value == 'login') {
            if (this.email.value.split("@")[1] == 'nitraa.pune') {
                if (this.email.value.split("@")[0] == 'admin') {
                    var _self_parent = this;
                    axios({
                        method: 'post',
                        url: '/login-admin',
                        data: {
                            email: this.email.value,
                            password: this.password.value
                        }
                    })
                        .then(function (response) {
                            if (response.data.status == 'success') {
                                localStorage.setItem('authtoken', response.headers.authtoken);
                                localStorage.setItem('profile', 'admin');
                                _self_parent.setState({ loginAlertText: "Successfully Logged In", loginAlertType: "success", loginAlertConfirmButton: "OK"});
                                _self_parent.handleLoginAlertOpen();
                            }
                            else {
                                _self_parent.setState({ loginAlertText: response.data.message, loginAlertType: "danger", loginAlertConfirmButton: "I Understand" });
                                _self_parent.handleLoginAlertOpen();
                            }
                        })
                        .catch(function (error) {
                            _self_parent.setState({ loginAlertText: "Unexpected error occured", loginAlertType: "danger", loginAlertConfirmButton: "I Understand" });
                            _self_parent.handleLoginAlertOpen();
                            console.log(error);
                        });
                }
                else {
                    var _self_parent = this;
                    axios({
                        method: 'post',
                        url: '/login-moderator',
                        data: {
                            email: this.email.value,
                            password: this.password.value
                        }
                    })
                        .then(function (response) {
                            if (response.data.status == 'success') {
                                localStorage.setItem('authtoken', response.headers.authtoken);
                                localStorage.setItem('profile', 'moderator');
                                _self_parent.setState({ loginAlertText: "Successfully Logged In", loginAlertType: "success", loginAlertConfirmButton: "OK"});
                                _self_parent.handleLoginAlertOpen();
                            }
                            else {
                              _self_parent.setState({ loginAlertText: response.data.message, loginAlertType: "danger", loginAlertConfirmButton: "I Understand" });
                              _self_parent.handleLoginAlertOpen();
                            }
                        })
                        .catch(function (error) {
                            _self_parent.setState({ loginAlertText: "Unexpected error occured", loginAlertType: "danger", loginAlertConfirmButton: "I Understand" });
                            _self_parent.handleLoginAlertOpen();
                            console.log(error);
                        });
                }
            }
            else {
                var _self_parent = this;
                axios({
                    method: 'post',
                    url: '/signin-user',
                    data: {
                        email: this.email.value,
                        password: this.password.value
                    }
                })
                    .then(function (response) {
                        if (response.data.status == 'success') {
                            localStorage.setItem('authtoken', response.headers.authtoken);
                            localStorage.setItem('profile', 'user');
                            _self_parent.setState({ loginAlertText: "Successfully Logged In", loginAlertType: "success", loginAlertConfirmButton: "OK"});
                            _self_parent.handleLoginAlertOpen();
                        }
                        else {
                          _self_parent.setState({ loginAlertText: response.data.message, loginAlertType: "danger", loginAlertConfirmButton: "I Understand" });
                          _self_parent.handleLoginAlertOpen();
                        }
                    })
                    .catch(function (error) {
                        _self_parent.setState({ loginAlertText: "Unexpected error occured", loginAlertType: "danger", loginAlertConfirmButton: "I Understand" });
                        _self_parent.handleLoginAlertOpen();
                        console.log(error);
                    });
            }
        }
        else if (event.target.value == 'recover') {

        }
        else {
            window.open("/register","_self")
        }
    }

    handleResponseFacebook(res){
      console.log(res);
    }
    responseGoogle(res){
      if(res.error || !res.profileObj){
        this.setState({ loginAlertText: "Sorry! Unexpected Error." });
        this.handleLoginAlertOpen();
      }
      else{
        var _self = this;
        axios({
          method: 'POST',
          url: '/googleAuth',
          data:{
            profileObj: res.profileObj
          }
        }).then(response =>{
            // console.log(response);
            if(response.data.status === 'success'){
              localStorage.setItem('authtoken', response.headers.authtoken);
              localStorage.setItem('profile', 'user');
              _self.setState({ loginAlertText: "Successfully Logged In", loginAlertType: "success", loginAlertConfirmButton: "OK"});
              _self.handleLoginAlertOpen();

            }
            else{
              _self.setState({ loginAlertText: response.data.message, loginAlertType: "danger", loginAlertConfirmButton: "I Understand" });
              _self.handleLoginAlertOpen();
            }
        }).catch(error=>{
            _self.setState({ loginAlertText: "Unexpected error occured", loginAlertType: "danger", loginAlertConfirmButton: "I Understand" });
            _self.handleLoginAlertOpen();
        });
      }
    }

    render() {
        const formStyle = {
            marginTop: "23vh"
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
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={formLabelStyle}>Password</Form.Label>
                                <Form.Control type="password" placeholder="For secure access" ref={password => this.password = password} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Row>
                                <Col xs={2}>
                                    <Button variant="primary" value="login" onClick={this.handleLogin}>
                                        Submit
                                    </Button>
                                </Col>
                                <Col xs={{ span: 2, offset: 2 }}>
                                </Col>
                                {/*<Col xs={{ span: 2, offset: 2 }}>
                                    <Button variant="primary" value="recover" onClick={this.handleLogin}>
                                        Recover
                                    </Button>
                                </Col>*/}
                                <Col xs={{ span: 2, offset: 2 }}>
                                    <Button variant="primary" value="register" onClick={this.handleLogin}>
                                        Register
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: 20 }}>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Label style={formLabelStyle}>One click login with</Form.Label>
                            <Row>
                                {/*<Col>
                                  <FacebookProvider appId="402065750608440">
                                    <Login
                                      scope="name,email,picture"
                                      onResponse={this.handleResponseFacebook.bind(this)}
                                      render={({ isLoading, isWorking, onClick }) => (
                                        <SocialIcon onClick={onClick} network="facebook" bgColor="#ffffff" className="iconsSignin"/>
                                      )}
                                    />
                                  </FacebookProvider>
                                </Col>*/}
                                <Col>
                                  <GoogleLogin
                                    clientId="852876963227-2h0cv9040sjn5567bdh43ejrg364jt6p.apps.googleusercontent.com"
                                    autoLoad={false}
                                    render={renderProps => (
                                        <SocialIcon onClick={renderProps.onClick} disabled={renderProps.disabled} network="google" bgColor="#ffffff" className="iconsSignin"/>
                                    )}
                                    onSuccess={this.responseGoogle.bind(this)} onFailure={this.responseGoogle.bind(this)}
                                    cookiePolicy={'single_host_origin'}
                                  />
                                </Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
                <Sweetalert type={this.state.loginAlertType} confirmBtnText={this.state.loginAlertConfirmButton} confirmBtnBsStyle="primary" title="Account Sign In" show={this.state.loginAlertShow} onConfirm={this.handleLoginAlertClose}>
                    {this.state.loginAlertText}
                </Sweetalert>
                <Footer />
            </Container>
        )
    }
}

export default LoginPage;
