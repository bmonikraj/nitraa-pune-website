import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import MaterialIcons from 'material-icons-react';
import Figure from 'react-bootstrap/Figure';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import Sweetalert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import queryString from 'query-string';

class JobEditPane extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      companyName: "",
      deadline: "",
      location: "",
      externalLinks: "",
      jobSalary: "",
      applicationLink: "",
      AlertText : "",
      AlertShow : false,
      AlertStyle : "danger",
      AlertConfirmButton: "I Understand",
      responseFetched: 0
    }
    this.handleAlertClose = this.handleAlertClose.bind(this);
    this.handleAlertShow = this.handleAlertShow.bind(this);
  }
  handleAlertShow() {
      this.setState({ AlertShow: true });
  }

  handleAlertClose() {
      this.setState({ AlertShow: false });
      if(this.state.AlertStyle === "success"){
        window.open("/jobs-list", "_self");
      }
  }
  componentDidMount(){
    var params = queryString.parse(this.props.location.search);
    if(params.jid && localStorage.getItem('profile') === "user"){
      this.setState({
        id: params.jid
      });
      var _self_parent = this;
      axios({
        method: 'GET',
        url: '/jobs/'+ params.jid,
      }).then(response => {
        if(response.data.status === "success"){
          _self_parent.setState({
            title: response.data.data.jobTitle,
            description: response.data.data.jobDescription,
            companyName: response.data.data.jobCompanyName,
            deadline: response.data.data.jobDeadline,
            location: response.data.data.jobLocation,
            externalLinks: response.data.data.jobExtLinks,
            applicationLink: response.data.data.jobApplicationLink,
            jobSalary: response.data.data.jobSalary,
            responseFetched: 1
          });
        }
        else{
          _self_parent.setState({
            responseFetched: 300
          });
        }
      }).catch(error =>{
        console.log(error);
        _self_parent.setState({
          responseFetched: 300
        });
      });
    }
    else{
      this.setState({responseFetched: 404});
    }
  }
  updateJobDetails(){
    var jobId = this.state.id;
    var jobTitle = this.state.title;
    var jobDescription = this.state.description;
    var jobCompanyName = this.state.companyName;
    var jobDeadline = this.state.deadline;
    var jobLocation = this.state.location;
    var jobSalary = this.state.jobSalary;
    var jobExtLinks = this.state.externalLinks;
    var jobApplicationLink = this.state.applicationLink;
    if(jobSalary==="" || jobId==="" || jobTitle==="" || jobDescription==="" || jobCompanyName==="" || jobDeadline==="" || jobLocation==="" || jobExtLinks==="" || jobApplicationLink===""){
      this.setState({AlertText : "One or more field(s) empty.", AlertStyle : "danger", AlertConfirmButton: "I Understand"});
      this.handleAlertShow();
    }
    else{
        var _self = this;
        axios({
          method: 'PUT',
          url: "/jobs",
          data:{
            id:jobId,
            jobTitle:jobTitle,
            jobDescription:jobDescription,
            jobCompanyName:jobCompanyName,
            jobDeadline:jobDeadline,
            jobLocation:jobLocation,
            jobExtLinks:jobExtLinks,
            jobSalary:jobSalary,
            jobApplicationLink:jobApplicationLink
          },
          headers: {
            authtoken: localStorage.getItem('authtoken')
          }
        }).then(response=>{
          if(response.data.status === "success"){
            _self.setState({AlertText : "Blog Details edited successfully.", AlertStyle : "success", AlertConfirmButton: "OK"});
            _self.handleAlertShow();
          }
          else{
            _self.setState({AlertText : response.data.message, AlertStyle : "danger", AlertConfirmButton: "I Understand"});
            _self.handleAlertShow();
          }
        }).catch(error=>{
          console.log(error);
          _self.setState({AlertText : "An Unexpected Error Occured.", AlertStyle : "danger", AlertConfirmButton: "I Understand"});
          _self.handleAlertShow();
        });
    }
  }
  changeTitle(event){
    console.log(event.target.value);
    this.setState({
      title: event.target.value
    });
  }
  changeDescription(event){
    console.log(event.target.value);
    this.setState({
      description: event.target.value
    });
  }
  changeCompanyName(event){
    console.log(event.target.value);
    this.setState({
      companyName: event.target.value
    });
  }
  changeSalary(event){
    console.log(event.target.value);
    this.setState({
      jobSalary: event.target.value
    });
  }
  changeDeadline(event){
    console.log(event.target.value);
    this.setState({
      deadline: event.target.value
    });
  }
  changeLocation(event){
    console.log(event.target.value);
    this.setState({
      location: event.target.value
    });
  }
  changeExt(event){
    console.log(event.target.value);
    this.setState({
      externalLinks: event.target.value
    });
  }
  changeApplicationLink(event){
    console.log(event.target.value);
    this.setState({
      applicationLink: event.target.value
    });
  }
  render() {
    const styleTableDiv = {
        marginTop : '15vh',
        marginBottom : '15vh',
        padding: "10px",
        background: "#eee"
    }
    if(this.state.responseFetched === 0){
      return(
        <Container>
          <Header/>
          <div style = {styleTableDiv}>
            <Row>
              <Col>
                <center><h2>Edit Job Details</h2></center>
              </Col>
            </Row>
            <div style = {{padding: '5px'}}>
              <center><h4>Loading ...</h4></center>
            </div>
          </div>
          <Footer/>
        </Container>
      )
    }
    else if(this.state.responseFetched === 404){
      return(
        <Container>
          <Header/>
          <div style = {styleTableDiv}>
            <Row>
              <Col>
                <center><h2>Edit Job Details</h2></center>
              </Col>
            </Row>
            <div style = {{padding: '5px'}}>
              <center><h4>Not authorized to perform this action.</h4></center>
            </div>
          </div>
          <Footer/>
        </Container>
      )
    }
    else if(this.state.responseFetched === 300){
      return(
        <Container>
          <Header/>
          <div style = {styleTableDiv}>
            <Row>
              <Col>
                <center><h2>Edit Job Details</h2></center>
              </Col>
            </Row>
            <div style = {{padding: '5px'}}>
              <center><h4>Something went wrong! Please try again..</h4></center>
            </div>
          </div>
          <Footer/>
        </Container>
      )
    }
    else if(this.state.responseFetched === 1){
      return(
        <Container>
          <Header/>
          <div style = {styleTableDiv}>
            <Row>
              <Col>
                <center><h2>Edit Job Details</h2></center>
              </Col>
            </Row>
            <div style={{padding: '5px'}}>
              <Form>
                <Row>
                  <Col>
                    <Row style = {{padding: "1rem"}}>
                      <Col xs={12} md={6}>
                        <Form.Label>
                          Title
                        </Form.Label>
                        <Form.Control type = "text" id = "job-title" placeholder = "Title" value={this.state.title} onChange={this.changeTitle.bind(this)} required></Form.Control>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Label>
                          Company Name
                        </Form.Label>
                        <Form.Control type = "text" id = "company-name" placeholder = "Company Name" value={this.state.companyName} onChange={this.changeCompanyName.bind(this)} required></Form.Control>
                      </Col>
                    </Row>
                    <Row style ={{padding: "1rem", margin: "0"}}>
                      <Form.Control as = "textarea" rows = "3" id = "job-description" placeholder = "Description" value={this.state.description} onChange={this.changeDescription.bind(this)} required></Form.Control>
                    </Row>
                    <Row style ={{padding: "1rem"}}>
                      <Col xs={12} md={4}>
                        <Form.Label>
                          Location
                        </Form.Label>
                        <Form.Control type = "text" id = "job-location" placeholder = "Location" value={this.state.location} onChange={this.changeLocation.bind(this)} required></Form.Control>
                      </Col>
                      <Col xs={12} md={4}>
                        <Form.Label>
                          Salary
                        </Form.Label>
                        <Form.Control type = "text" id = "job-salary" placeholder = "Salary" value={this.state.jobSalary} onChange={this.changeSalary.bind(this)} required></Form.Control>
                      </Col>
                      <Col xs={12} md={4}>
                        <Form.Label>
                          Deadline
                        </Form.Label>
                        <Form.Control type = "date" id = "job-deadline" placeholder = "Deadline" value={this.state.deadline} onChange={this.changeDeadline.bind(this)} required></Form.Control>
                      </Col>
                    </Row>
                    <Row style ={{padding: "1rem"}}>
                      <Col xs={12} md={6}>
                        <Form.Label>
                          Form Application Link
                        </Form.Label>
                        <Form.Control type = "text" id = "job-application-link" placeholder = "Application Link" value={this.state.applicationLink} onChange={this.changeApplicationLink.bind(this)} required></Form.Control>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Label>
                          External Link
                        </Form.Label>
                        <Form.Control type = "text" id = "job-external-links" placeholder = "External Links" value={this.state.externalLinks} onChange={this.changeExt.bind(this)} required></Form.Control>
                      </Col>
                    </Row>

                    <Row style = {{padding: "1rem", margin: "0"}}>
                      <Button variant = "primary" onClick = {this.updateJobDetails.bind(this)}>Submit</Button>
                    </Row>

                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          <Footer/>
          <Sweetalert type={this.state.AlertStyle} confirmBtnText={this.state.AlertConfirmButton} confirmBtnBsStyle="primary" title="Job Details" show={this.state.AlertShow} onConfirm={this.handleAlertClose}>
              {this.state.AlertText}
          </Sweetalert>
        </Container>
      );
    }
  }
}
export default JobEditPane;
