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
  addJobDetails(){
    if(localStorage.getItem('authtoken')){
      let jobTitle = $("#job-title").val();
      let jobDatePosted = $("#job-date-posted").val();
      let jobDescription = $("#job-description").val();
      let jobCompanyName = $("#company-name").val();
      let jobDeadline = $("#job-deadline").val();
      let jobLocation = $("#job-location").val();
      let jobExtLinks = $("#job-external-links").val();
      let jobApplicationLink = $("#job-application-link").val();
      let jobPostedby = $("#job-posted-by").val();
      if(/*Condition for checking empty fields*/true){
        axios({
          method: "POST",
          url: '/jobs',
          headers: {
            authtoken: localStorage.getItem('authtoken')
          },
          data: {
            jobTitle: jobTitle,
            jobDatePosted: jobDatePosted,
            jobDescription: jobDescription,
            jobCompanyName: jobCompanyName,
            jobDeadline: jobDeadline,
            jobLocation: jobLocation,
            jobExtLinks: jobExtLinks,
            jobApplicationLink: jobApplicationLink,
            jobPostedby: jobPostedby
          }
        }).then((response) => {
            console.log(response);
            if(response.data.status === "success"){
              alert('New job details are added successfully!!!');
              window.open('/jobs', '_self');
            }
        }).catch((error) => {
          console.log(error);
        })
      }
      else{
        alert('Please check if any field is not filled!');
      }
  }
  else{
    alert('You are not logged in!!!');
  }
}
  render () {
      const styleTableDiv = {
          marginTop : '15vh',
          marginBottom : '15vh',
          background : "#eeeeee"
      }
    return (
      <Container>
      <Header />
        <div style={styleTableDiv}>
          <Tabs defaultActiveKey = "job">
            <Tab eventKey = "job" title = "JOB DETAILS">
                  <Row style = {{padding: "1rem"}}>
                    <Col>
                      <Form.Control type = "text" id = "job-title" placeholder = "Title" required></Form.Control>
                    </Col>
                    <Col>
                      Dated Posted:<Form.Control type = "date" id = "job-date-posted" required></Form.Control>
                    </Col>
                  </Row>
                  <Row style ={{padding: "1rem", margin: "0"}}>
                    <Form.Control as = "textarea" rows = "3" id = "job-description" placeholder = "Description" required></Form.Control>
                  </Row>
                  <Row style ={{padding: "1rem"}}>
                    <Col>
                      <Form.Control type = "text" id = "company-name" placeholder = "Company Name" required></Form.Control>
                    </Col>
                    <Col>
                      Deadline:<Form.Control type = "date" id = "job-deadline" placeholder = "Deadline" required></Form.Control>
                    </Col>
                  </Row>
                  <Row style ={{padding: "1rem"}}>
                    <Col>
                      <Form.Control type = "text" id = "job-location" placeholder = "Location" required></Form.Control>
                    </Col>
                    <Col>
                      <Form.Control type = "text" id = "job-external-links" placeholder = "External Links" required></Form.Control>
                    </Col>
                  </Row>

                  <Row style ={{padding: "1rem"}}>
                    <Col>
                      <Form.Control type = "text" id = "job-application-link" placeholder = "Application Link" required></Form.Control>
                    </Col>

                    <Col>
                      <Form.Control type = "text" id = "job-posted-by"  placeholder = "Posted By" required></Form.Control>
                    </Col>
                  </Row>

                  <Row style = {{padding: "1rem", margin: "0"}}>
                    <Button variant = "primary" onClick = {this.addJobDetails.bind(this)}>Submit</Button>
                  </Row>
            </Tab>
          </Tabs>
        </div>
      <Footer/>
      </Container>
    )
  }
}

export default JobDetailsFillup;
