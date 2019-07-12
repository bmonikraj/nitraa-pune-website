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
          RegisterAlertText: "",
          RegisterAlertType: "danger",
          RegisterAlertButton: "I Understand"
        }
    }

    handleRegisterAlertOpen() {
        this.setState({ RegisterAlertShow: true });
    }

    handleRegisterAlertClose() {
        this.setState({ RegisterAlertShow: false });
        if(this.state.RegisterAlertType === "success"){
          this.email.value = "";
          this.password.value = "";
          this.alumniname.value = "";
          this.cnfpassword.value = "";
          this.mobilenumber.value = "";
          this.branchName.value = "";
          this.yop.value = "";
          this.organization.value = "";
        }
    }

    handleRegister(event) {
        console.log(event.target);
        if(this.email.value != "" && this.password.value != "" && this.alumniname.value != "" && this.mobilenumber.value != "" && this.branchName.value != "" && this.yop.value != "" && this.organization.value != ""){
          if (event.target.value == 'register' && this.password.value === this.cnfpassword.value) {
                  var _self_parent = this;
                  axios({
                      method: 'post',
                      url: '/signup-user',
                      data: {
                          email: this.email.value,
                          password: this.password.value,
                          name: this.alumniname.value,
                          phone: this.mobilenumber.value,
                          branch: this.branchName.value,
                          yop: this.yop.value,
                          organization: this.organization.value
                      }
                  })
                      .then(function (response) {
                          if (response.data.status == 'success') {
                              _self_parent.setState({ RegisterAlertText: "Successfully registered", RegisterAlertType: "success", RegisterAlertButton: "OK" });
                              _self_parent.handleRegisterAlertOpen();

                          }
                          else {
                              _self_parent.setState({ RegisterAlertText: response.data.message, RegisterAlertType: "danger", RegisterAlertButton: "I Understand" });
                              _self_parent.handleRegisterAlertOpen();
                          }
                      })
                      .catch(function (error) {
                          console.log(error);
                          _self_parent.setState({ RegisterAlertText: "Unexpected Error Occured", RegisterAlertType: "danger", RegisterAlertButton: "I Understand" });
                          _self_parent.handleRegisterAlertOpen();
                      });

          }
          else{
              this.setState({ RegisterAlertText: "Passwords do not match", RegisteredAlertType: "danger", RegisterAlertButton: "I Understand" });
              this.handleRegisterAlertOpen();
          }
        }
        else{
          this.setState({ RegisterAlertText: "One or more field(s) missing", RegisteredAlertType: "danger", RegisterAlertButton: "I Understand" });
          this.handleRegisterAlertOpen();
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
                                <Form.Control type="text" placeholder="Please enter your mobile number" ref={mobilenumber => this.mobilenumber = mobilenumber} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="formBasicText">
                                <Form.Label style={formLabelStyle}>Branch</Form.Label>
                                <Form.Control as="select" ref={branch => this.branchName = branch }>
                                  <option value="">--Select Branch--</option>
                                  <option value="Architecture">Architecture</option>
                                  <option value="Biomedical">Biomedical</option>
                                  <option value="Biotechnology">Biotechnology</option>
                                  <option value="Civil">Civil</option>
                                  <option value="Chemical">Chemical</option>
                                  <option value="Ceramic">Ceramic</option>
                                  <option value="Computer Science and Engg.">Comp. Sc. and Engg.</option>
                                  <option value="Electronics and Communication">Electronics and Comm.</option>
                                  <option value="Electrical">Electrical</option>
                                  <option value="Electronics and Instrumentation">Electronics and Ins.</option>
                                  <option value="Food Processing">Food Processing</option>
                                  <option value="Industrial Design">Industrial Design</option>
                                  <option value="Mechanical">Mechanical</option>
                                  <option value="Metallurgical">Metallurgical</option>
                                  <option value="Mining">Mining</option>
                                  <option value="Chemistry">Chemistry</option>
                                  <option value="Life Science">Life Science</option>
                                  <option value="Mathematics">Mathematics</option>
                                  <option value="Physics">Physics</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="formBasicText">
                                <Form.Label style={formLabelStyle}>Year of Passing</Form.Label>
                                <Form.Control type="month" ref={yop => this.yop = yop} onChange={(event) => {console.log(event.target.value);}}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="formBasicText">
                                <Form.Label style={formLabelStyle}>Organization Currently In</Form.Label>
                                <Form.Control type="text" placeholder="Please enter organization" ref={organization => this.organization = organization} />
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
                    {/*
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
                    */}
                </Form>
                <Sweetalert type={this.state.RegisterAlertType} confirmBtnText={this.state.RegisterAlertButton} confirmBtnBsStyle="primary" title="Registration" show={this.state.RegisterAlertShow} onConfirm={this.handleRegisterAlertClose}>
                    {this.state.RegisterAlertText}
                </Sweetalert>
                <Footer/>
            </Container>
        )
    }
}

export default Register;
