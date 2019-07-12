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
import SweetAlert from 'react-bootstrap-sweetalert';
import SingleJobContainer from './SingleJobContainer';
import axios from 'axios';
class JobHandle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      jobListArray: [],
      jobEditableList: [],
      responseFetched: 0,
      userLoggedIn: 0,
      DeleteConfirmShow: false,
      deleteJobId: "",
      AlertShow: false,
      AlertText: "",
      AlertStyle: "danger",
      AlertConfirmButton: "I Understand",
      DeleteConfirmShow: false
    }
    this.handleAlertShow=this.handleAlertShow.bind(this);
  }
  handleAlertShow(){
    this.setState({
      AlertShow: true
    });
  }
  componentDidMount(){
    let _self_parent = this;
    if(localStorage.getItem('authtoken')){
      if(localStorage.getItem('profile') === 'user'){
        this.setState({userLoggedIn: 1});
        axios({
          method: 'GET',
          url: '/jobs',
          headers: {
            authtoken: localStorage.getItem('authtoken')
          }
        }).then((response) => {
          console.log(response);
          if(response.data.status === "success"){
            _self_parent.setState({jobListArray: response.data.data, jobEditableList: response.data.data2, responseFetched: 1});
          }
          else{
            _self_parent.setState({responseFetched: 300});
          }
        }).catch((error) => {
          _self_parent.setState({responseFetched: 300});
          console.log(error);
        })
      }
      else{
        axios({
          method: 'GET',
          url: '/jobs'
        }).then((response) => {
          console.log(response);
          if(response.data.status === "success"){
            _self_parent.setState({jobListArray: response.data.data, responseFetched: 1});
          }
          else{
            _self_parent.setState({responseFetched: 300});
          }
        }).catch((error) => {
          _self_parent.setState({responseFetched: 300});
          console.log(error);
        })
      }
    }
    else{
      this.setState({responseFetched: 404});
    }
  }

  deleteJobDetails(jobId){
    this.setState({
      deleteJobId: jobId,
      DeleteConfirmShow: true
    });
  }

  deleteRecord(jobId){
    this.setState({
      DeleteConfirmShow: false
    });
    if(localStorage.getItem('authtoken') && localStorage.getItem('profile') === 'user'){
      var _self = this;
      axios({
        method: "DELETE",
        url: "/jobs",
        data: {
          id: jobId
        },
        headers: {
          authtoken: localStorage.getItem('authtoken')
        }
      }).then(response => {
        if(response.data.status === "success"){
          _self.setState({
            AlertText: "Job details Deleted Successfully",
            AlertStyle: "success",
            AlertConfirmButton: "OK"
          });
          _self.handleAlertShow();
        }
        else{
          _self.setState({
            AlertText: response.data.message,
            AlertStyle: "danger",
            AlertConfirmButton: "I Understand"
          });
          _self.handleAlertShow();
        }
      }).catch(error =>{
        _self.setState({
          AlertText: "An Unexpected Error Occured",
          AlertStyle: "danger",
          AlertConfirmButton: "I Understand"
        });
        _self.handleAlertShow();
      });
    }
    else{
      _self.setState({
        AlertText: "Not authorized to perform this action",
        AlertStyle: "danger",
        AlertConfirmButton: "OK"
      });
      _self.handleAlertShow();
    }
  }
  cancelDelete(){
    this.setState({
      DeleteConfirmShow: false
    });
  }
  handleAlertClose(){
    this.setState({
      AlertShow: false
    });
    if(this.state.AlertStyle === "success"){
      window.open("/jobs-list", "_self");
    }
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
                <center><h2>Job Opportunities</h2></center>
              </Col>
            </Row>
            <hr/>
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
                <center><h2>Job Opportunities</h2></center>
              </Col>
            </Row>
            <hr/>
            <div style = {{padding: '5px'}}>
              <center><h4>Sorry! Not authorized to view this page..</h4></center>
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
                <center><h2>Job Opportunities</h2></center>
              </Col>
            </Row>
            <hr/>
            <div style = {{padding: '5px'}}>
              <center><h4>Something went wrong! Please try again..</h4></center>
            </div>
          </div>
          <Footer/>
        </Container>
      )
    }
    else if(this.state.responseFetched === 1){
      if(this.state.jobListArray.length){
        if(this.state.userLoggedIn){
          let elem1;
          let elem2;

          elem1 = this.state.jobListArray.map((item) => {
              return(<SingleJobContainer
                key = {item._id}
                jobId = {item._id}
                jobDetails = {item}
                />);
          });
          if(this.state.jobEditableList.length){
            elem2 = this.state.jobEditableList.map((item) => {
              return(<SingleJobContainer
                key = {item._id}
                jobId = {item._id}
                jobDetails = {item}
                editable = {true}
                deleteJob = {this.deleteJobDetails.bind(this)}
                />);
            });
          }
          else{
            elem2 = <center style={{color: "grey"}}><h5>No Records found.</h5></center>
          }
          return(
            <Container>
              <Header/>
              <div style = {styleTableDiv}>
                <div style = {{padding: '5px'}}>
                  <a href="/add-job-details" style={{textDecoration: "none"}}><Button variant="outline-info">ADD A JOB OPPORTUNITY</Button></a>
                </div>
                <hr/>
                <Row>
                  <Col>
                    <center><h2>Job Opportunities</h2></center>
                  </Col>
                </Row>
                <hr/>
                <div style = {{padding: '5px'}}>
                  {elem1}
                </div>
                <hr/>
                <Row>
                  <Col>
                    <center><h2>Jobs added by you</h2></center>
                  </Col>
                </Row>
                <hr/>
                <div style = {{padding: '5px'}}>
                  {elem2}
                </div>
              </div>
              <Footer/>
              <SweetAlert
                  warning
                  showCancel
                  confirmBtnText="Yes, delete it!"
                  confirmBtnBsStyle="danger"
                  cancelBtnBsStyle="default"
                  title="Are you sure?"
                  onConfirm={this.deleteRecord.bind(this,this.state.deleteJobId)}
                  onCancel={this.cancelDelete.bind(this)}
                  show={this.state.DeleteConfirmShow}
              >
                  You will not be able to recover.
              </SweetAlert>
              <SweetAlert
                  confirmBtnText={this.state.AlertConfirmButton}
                  title="Job Details"
                  type={this.state.AlertStyle}
                  onConfirm={this.handleAlertClose.bind(this)}
                  show={this.state.AlertShow}
              >
                  {this.state.AlertText}
              </SweetAlert>
            </Container>
          );
        }
        else{
          let elem;
          elem = this.state.jobListArray.map((item) => {
              return(<SingleJobContainer
                key = {item._id}
                jobId = {item._id}
                jobDetails = {item}
                />);
          });
          return(
            <Container>
              <Header/>
              <div style = {styleTableDiv}>
                <Row>
                  <Col>
                    <center><h2>Job Opportunities</h2></center>
                  </Col>
                </Row>
                <hr/>
                <div style = {{padding: '5px'}}>
                  {elem}
                </div>
                <hr/>
              </div>
              <Footer/>
            </Container>
          )
        }
      }
      else{
        if(this.state.userLoggedIn){
          return(
            <Container>
              <Header/>
              <div style = {styleTableDiv}>
                <div style = {{padding: '5px'}}>
                  <a href="/add-job-details" style={{textDecoration: "none"}}><Button variant="outline-info">ADD A JOB OPPORTUNITY</Button></a>
                </div>
                <hr/>
                <Row>
                  <Col>
                    <center><h2>Job Opportunities</h2></center>
                  </Col>
                </Row>
                <hr/>
                <div style = {{padding: '5px'}}>
                  <center style={{color: "grey"}}><h5>No Records found.</h5></center>
                </div>
                <hr/>
                <Row>
                  <Col>
                    <center><h2>Jobs added by you</h2></center>
                  </Col>
                </Row>
                <hr/>
                <div style = {{padding: '5px'}}>
                  <center style={{color: "grey"}}><h5>No Records found.</h5></center>
                </div>
              </div>
              <Footer/>
            </Container>
          )
        }
        else{
          return(
            <Container>
              <Header/>
              <div style = {styleTableDiv}>
                <Row>
                  <Col>
                    <center><h2>Job Opportunities</h2></center>
                  </Col>
                </Row>
                <hr/>
                <div style = {{padding: '5px'}}>
                  <center style={{color: "grey"}}><h5>No Records found.</h5></center>
                </div>
                <hr/>
              </div>
              <Footer/>
            </Container>
          )
        }
      }
    }
  }
}
export default JobHandle;
