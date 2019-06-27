import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import queryString from 'query-string';

class JobDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          id: "",
          title: "",
          description: "",
          companyName: "",
          deadline: "",
          location: "",
          externalLinks: "",
          applicationLink: "",
          postedOn: "",
          postedBy: "",
          jobSalary: "",
          responseFetched: 0
        }
    }
    componentDidMount(){
      var params = queryString.parse(this.props.location.search);
      if(params.jid){
        this.setState({
          id: params.jid
        });
      }

      let _self = this;
      axios({
        method: 'GET',
        url: '/jobs/'+ params.jid,
      }).then((response) => {
        console.log(response);
        if(response.data.status === "success"){
          _self.setState({
            title: response.data.data.jobTitle,
            description: response.data.data.jobDescription,
            companyName: response.data.data.jobCompanyName,
            deadline: (new Date(response.data.data.jobDeadline)).toDateString(),
            location: response.data.data.jobLocation,
            externalLinks: response.data.data.jobExtLinks,
            applicationLink: response.data.data.jobApplicationLink,
            postedOn: response.data.data.jobDatePosted,
            postedBy: response.data.data.jobPostedby,
            jobSalary: response.data.data.jobSalary,
            responseFetched: 1
          });
        }
        else{
          _self.setState({
            responseFetched: 300
          });
        }
      }).catch((error) => {
        _self.setState({
          responseFetched: 300
        });
        console.log(error);
      });
    }

    render() {

      const styleTableDiv = {
          marginTop : '15vh',
          marginBottom : '15vh',
          background : "#eeeeee",
          padding: "10px"
      }
      if(this.state.responseFetched === 0){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                    <center><h4>Loading...</h4></center>
                  </div>
                <Footer />
            </Container>
        )
      }
      else if(this.state.responseFetched === 300){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                    <center><h4>Something went wrong! Please try again later..</h4></center>
                  </div>
                <Footer />
            </Container>
        )
      }
      else if(this.state.responseFetched === 1){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                      <Row>
                        <Col style={{color: "#444"}}>
                          <center><h3><b>JOB DETAILS</b></h3></center>
                        </Col>
                      </Row>
                      <hr/>
                      <Row style ={{padding: "1rem", margin: "0"}}>
                        <Col xs={12} md={4} style={{marginTop: "1rem"}}>
                          <center style={{fontSize:"0.9rem"}}><b>TITLE OF THE JOB</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.title}</center>
                          <center style={{fontSize:"0.9rem"}}><b>COMPANY NAME</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.companyName}</center>
                          <center style={{fontSize:"0.9rem"}}><b>LOCATION</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.location}</center>
                          <center style={{fontSize:"0.9rem"}}><b>SALARY</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.jobSalary}</center>
                        </Col>
                        <Col xs={12} md={4} style={{marginTop: "1rem"}}>
                          <center style={{fontSize:"0.9rem"}}><b>A BRIEF DESCRIPTION</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem", textAlign: "justify"}}>
                            <p>
                              {this.state.description}
                            </p>
                          </center>
                        </Col>
                        <Col xs={12} md={4} style={{marginTop: "1rem"}}>
                          <center style={{fontSize:"0.9rem"}}><b>DEADLINE</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.deadline}</center>
                          <center style={{fontSize:"0.9rem"}}><b>APPLICATION LINK</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.applicationLink}</center>
                          <center style={{fontSize:"0.9rem"}}><b>EXTERNAL LINK</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.externalLinks}</center>
                          <center style={{fontSize:"0.9rem"}}><b>POSTED ON</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.postedOn}</center>
                          <center style={{fontSize:"0.9rem"}}><b>POSTED BY</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.postedBy}</center>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={9}></Col>
                        <Col xs={12} md={2} style={{padding: "0.2rem 1rem"}}>
                          <a href="/jobs-list" style={{textDecoration: "none"}}>
                            <Button variant="outline-info" block>
                              Go Back
                            </Button>
                          </a>
                        </Col>
                      </Row>
                  </div>
                <Footer />
            </Container>
        )
      }
    }
}

export default JobDisplay;
