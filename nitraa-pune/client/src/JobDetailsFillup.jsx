import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MaterialIcons from 'material-icons-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import Sweetalert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import $ from 'jquery';

class JobDetailsFillup extends React.Component {
  constructor(props){
    super(props);
    this.state={
      AlertStyle: "danger",
      AlertShow: false,
      AlertText: "",
      AlertConfirmButton: "I Understand",
      pageStatus: 0
    }
    this.handleAlertClose = this.handleAlertClose.bind(this);
    this.handleAlertShow = this.handleAlertShow.bind(this);
  }
  componentDidMount(){
    if(localStorage.getItem('authtoken') && localStorage.getItem('profile') === "user"){
      this.setState({pageStatus: 1});
    }
    else{
      this.setState({pageStatus: 300});
    }
  }
  addJobDetails(){
    if(localStorage.getItem('authtoken') && localStorage.getItem('profile') === "user"){
      let jobTitle = $("#job-title").val();
      let jobDescription = $("#job-description").val();
      let jobCompanyName = $("#company-name").val();
      let jobDeadline = $("#job-deadline").val();
      let jobLocation = $("#job-location").val();
      let jobSalary = $("#job-salary").val();
      let jobExtLinks = $("#job-external-links").val();
      let jobApplicationLink = $("#job-application-link").val();
      if(jobTitle==="" || jobDescription==="" || jobCompanyName==="" || jobDeadline==="" || jobLocation==="" || jobExtLinks==="" || jobApplicationLink===""){
        this.setState({AlertText : "One or more field(s) missing.", AlertStyle : "danger", AlertConfirmButton: "I Understand"});
        this.handleAlertShow();
      }
      else{
        var _self = this;
        axios({
          method: "POST",
          url: '/jobs',
          headers: {
            authtoken: localStorage.getItem('authtoken')
          },
          data: {
            jobTitle: jobTitle,
            jobDescription: jobDescription,
            jobCompanyName: jobCompanyName,
            jobDeadline: jobDeadline,
            jobLocation: jobLocation,
            jobExtLinks: jobExtLinks,
            jobSalary: jobSalary,
            jobApplicationLink: jobApplicationLink
          }
        }).then((response) => {
            console.log(response);
            if(response.data.status === "success"){
              _self.setState({AlertText : "Job details added successfully", AlertStyle : "success", AlertConfirmButton: "OK"});
              _self.handleAlertShow();
            }
            else{
              _self.setState({AlertText : response.data.message, AlertStyle : "danger", AlertConfirmButton: "I Understand"});
              _self.handleAlertShow();
            }
        }).catch((error) => {
          _self.setState({AlertText : "Unexpected Error Occured.", AlertStyle : "danger", AlertConfirmButton: "I Understand"});
          _self.handleAlertShow();
          console.log(error);
        })
      }
  }
  else{
    this.setState({AlertText : "You are not logged in.", AlertStyle : "danger", AlertConfirmButton: "I Understand"});
    this.handleAlertShow();
    alert();
  }
}

  handleAlertShow() {
      this.setState({ AlertShow: true });
  }

  handleAlertClose() {
      this.setState({ AlertShow: false });
      if(this.state.AlertStyle === "success"){
        window.open('/jobs-list', '_self');
      }
  }
  render () {
      const styleTableDiv = {
          marginTop : '15vh',
          marginBottom : '15vh',
          background : "#eeeeee"
      }
      if(this.state.pageStatus === 0){
        return (
          <Container>
          <Header />
            <div style={styleTableDiv}>
              <Row style = {{paddingTop: "1rem"}}>
                <Col>
                  <center><h3>Add Jobs</h3></center>
                </Col>
              </Row>
              <hr/>
              <Row style = {{padding: "1rem"}}>
                <Col>
                  <center><h4>Loading...</h4></center>
                </Col>
              </Row>
            </div>
          <Footer/>
          </Container>
        )
      }
      else if(this.state.pageStatus === 1){
        return (
          <Container>
          <Header />
            <div style={styleTableDiv}>
              <Row style = {{paddingTop: "1rem"}}>
                <Col>
                  <center><h3>Add Job Details</h3></center>
                </Col>
              </Row>
              <hr/>
              <Row style = {{padding: "1rem"}}>
                <Col xs={12} md={6}>
                  <Form.Label>
                    Title
                  </Form.Label>
                  <Form.Control type = "text" id = "job-title" placeholder = "Title" required></Form.Control>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>
                    Company Name
                  </Form.Label>
                  <Form.Control type = "text" id = "company-name" placeholder = "Company Name" required></Form.Control>
                </Col>
              </Row>
              <Row style ={{padding: "1rem", margin: "0"}}>
                <Form.Control as = "textarea" rows = "3" id = "job-description" placeholder = "Description" required></Form.Control>
              </Row>
              <Row style ={{padding: "1rem"}}>
                <Col xs={12} md={4}>
                  <Form.Label>
                    Location
                  </Form.Label>
                  <Form.Control type = "text" id = "job-location" placeholder = "Location" required></Form.Control>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>
                    Salary
                  </Form.Label>
                  <Form.Control type = "text" id = "job-salary" placeholder = "Salary" required></Form.Control>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>
                    Deadline
                  </Form.Label>
                  <Form.Control type = "date" id = "job-deadline" placeholder = "Deadline" required></Form.Control>
                </Col>
              </Row>
              <Row style ={{padding: "1rem"}}>
                <Col xs={12} md={6}>
                  <Form.Label>
                    Form Application Link
                  </Form.Label>
                  <Form.Control type = "text" id = "job-application-link" placeholder = "Application Link" required></Form.Control>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>
                    External Link
                  </Form.Label>
                  <Form.Control type = "text" id = "job-external-links" placeholder = "External Links" required></Form.Control>
                </Col>
              </Row>

              <Row style = {{padding: "1rem", margin: "0"}}>
                <Button variant = "primary" onClick = {this.addJobDetails.bind(this)}>Submit</Button>
              </Row>
            </div>
          <Footer/>
          <Sweetalert type={this.state.AlertStyle} confirmBtnText={this.state.AlertConfirmButton} confirmBtnBsStyle="primary" title="Jobs Details" show={this.state.AlertShow} onConfirm={this.handleAlertClose}>
              {this.state.AlertText}
          </Sweetalert>
          </Container>
        )
      }
      else if(this.state.pageStatus === 300){
        return (
          <Container>
          <Header />
            <div style={styleTableDiv}>
              <Row style = {{paddingTop: "1rem"}}>
                <Col>
                  <center><h3>Add Job Details</h3></center>
                </Col>
              </Row>
              <hr/>
              <Row style = {{padding: "1rem"}}>
                <Col>
                  <center><h4>Not Authorized for this action.</h4></center>
                </Col>
              </Row>
            </div>
          <Footer/>
          </Container>
        )
      }
    return (
      <Container>
      <Header />
        <div style={styleTableDiv}>
          <Row style = {{paddingTop: "1rem"}}>
            <Col>
              <center><h3>Add Job Details</h3></center>
            </Col>
          </Row>
          <hr/>
          <Row style = {{padding: "1rem"}}>
            <Col xs={12} md={6}>
              <Form.Label>
                Title
              </Form.Label>
              <Form.Control type = "text" id = "job-title" placeholder = "Title" required></Form.Control>
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>
                Company Name
              </Form.Label>
              <Form.Control type = "text" id = "company-name" placeholder = "Company Name" required></Form.Control>
            </Col>
          </Row>
          <Row style ={{padding: "1rem", margin: "0"}}>
            <Form.Control as = "textarea" rows = "3" id = "job-description" placeholder = "Description" required></Form.Control>
          </Row>
          <Row style ={{padding: "1rem"}}>
            <Col xs={12} md={6}>
              <Form.Label>
                Location
              </Form.Label>
              <Form.Control type = "text" id = "job-location" placeholder = "Location" required></Form.Control>
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>
                Deadline
              </Form.Label>
              <Form.Control type = "date" id = "job-deadline" placeholder = "Deadline" required></Form.Control>
            </Col>
          </Row>
          <Row style ={{padding: "1rem"}}>
            <Col xs={12} md={6}>
              <Form.Label>
                Form Application Link
              </Form.Label>
              <Form.Control type = "text" id = "job-application-link" placeholder = "Application Link" required></Form.Control>
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>
                External Link
              </Form.Label>
              <Form.Control type = "text" id = "job-external-links" placeholder = "External Links" required></Form.Control>
            </Col>
          </Row>

          <Row style = {{padding: "1rem", margin: "0"}}>
            <Button variant = "primary" onClick = {this.addJobDetails.bind(this)}>Submit</Button>
          </Row>
        </div>
      <Footer/>
      <Sweetalert type={this.state.AlertStyle} confirmBtnText={this.state.AlertConfirmButton} confirmBtnBsStyle="primary" title="Jobs Details" show={this.state.AlertShow} onConfirm={this.handleAlertClose}>
          {this.state.AlertText}
      </Sweetalert>
      </Container>
    )
  }
}

export default JobDetailsFillup;
