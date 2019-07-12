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

class EventDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          id: "",
          name: "",
          date: "",
          time: "",
          location: "",
          description: "",
          regFees: "",
          extLinks: "",
          createdBy: "",
          onBehalfof: "",
          eventImg: "",
          responseFetched: 0,
          profile: "",
          registered: false,
          AlertShow: false,
          AlertText: "",
          AlertTitle:"",
          AlertStyle: "danger",
          AlertConfirmButton: "I Understand",
          DeleteConfirmShow: false,
          paid: true
        }
        this.handleAlertShow=this.handleAlertShow.bind(this);
    }
    handleAlertShow(){
      this.setState({
        AlertShow: true
      });
    }
    componentDidMount(){
      var params = queryString.parse(this.props.location.search);
      if(params.eid){
        this.setState({
          id: params.eid
        });
      }
      if(params.message){
        this.setState({
          AlertText: params.message,
          AlertTitle: params.title,
          AlertStyle: "success",
          AlertConfirmButton: "OK"
        });
        this.handleAlertShow();
      }

      if(localStorage.getItem("authtoken")){
        this.setState({
          profile: localStorage.getItem("profile")
        });
        if(localStorage.getItem('profile') === "user"){
          let _self=this;
          axios({
            method: 'GET',
            url: '/event-reg/'+ params.eid,
            headers:{
              authtoken: localStorage.getItem('authtoken')
            }
          }).then(response => {
            if(response.data.status === "success"){
              _self.setState({
                registered: response.data.data,
                payment_status: response.data.payment_status
              });
            }
          }).catch(error => {
            console.log(error);
          })
        }
      }
      else{
        this.setState({
          profile: ""
        });
      }

      let _self = this;
      axios({
        method: 'GET',
        url: '/events/'+ params.eid,
      }).then((response) => {
        console.log(response);
        if(response.data.status === "success"){
          _self.setState({
            name: response.data.data.eventName,
            date: response.data.data.eventDate,
            time: response.data.data.eventTime,
            location: response.data.data.eventLocation,
            description: response.data.data.eventDescription,
            regFees: response.data.data.eventRegFees,
            extLinks: response.data.data.eventExtLinks,
            createdBy: response.data.data.eventCreatedby,
            onBehalfof: response.data.data.eventOnBehalfof,
            eventImg: params.eid + "." + response.data.data.event_image_ext,
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
    deleteEvent(){
      this.setState({
        DeleteConfirmShow: true
      });
    }
    deleteRecord(eventId){
      this.setState({
        DeleteConfirmShow: false
      });
      if(localStorage.getItem('authtoken') && localStorage.getItem('profile') === 'moderator'){
        var _self = this;
        console.log(eventId);
        axios({
          method: "DELETE",
          url: "/events",
          data: {
            id: eventId
          },
          headers: {
            authtoken: localStorage.getItem('authtoken')
          }
        }).then(response => {
          if(response.data.status === "success"){
            _self.setState({
              AlertText: "Event details Deleted Successfully",
              AlertTitle: "Event Details",
              AlertStyle: "success",
              AlertConfirmButton: "OK"
            });
            _self.handleAlertShow();
          }
          else{
            _self.setState({
              AlertText: response.data.message,
              AlertTitle: "Event Details",
              AlertStyle: "danger",
              AlertConfirmButton: "I Understand"
            });
            _self.handleAlertShow();
          }
        }).catch(error =>{
          _self.setState({
            AlertText: "An Unexpected Error Occured",
            AlertTitle: "Event Details",
            AlertStyle: "danger",
            AlertConfirmButton: "I Understand"
          });
          _self.handleAlertShow();
        });
      }
      else{
        _self.setState({
          AlertText: "Not authorized to perform this action",
          AlertTitle: "Event Details",
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
        if(this.state.profile === "user"){
          window.open("/eventPage?eid="+this.state.id, "_self");
        }
        else{
          window.open("/events-list", "_self");
        }
      }
    }
    register(){
      var _self = this;
      axios({
        method: 'POST',
        url: '/event-reg',
        data: {
          eid: this.state.id
        },
        headers:{
          authtoken: localStorage.getItem('authtoken')
        }
      }).then(response=>{
        if(response.data.status === "success"){
          _self.setState({
            AlertText: "Successfully Registered.",
            AlertTitle: "Event Registration",
            AlertStyle: "success",
            AlertConfirmButton: "OK",
            registered: true
          });
          _self.handleAlertShow();
        }
        else{
          _self.setState({
            AlertText: response.data.message,
            AlertTitle: "Event Registration",
            AlertStyle: "danger",
            AlertConfirmButton: "I Understand"
          });
          _self.handleAlertShow();
        }
      }).catch(error => {
        _self.setState({
          AlertText: "An Unexpected Error Occured.",
          AlertTitle: "Event Registration",
          AlertStyle: "danger",
          AlertConfirmButton: "I Understand"
        });
        _self.handleAlertShow();
      });
    }
    unregister(){
      var _self = this;
      axios({
        method: 'DELETE',
        url: '/event-reg',
        data: {
          eventId: this.state.id
        },
        headers:{
          authtoken: localStorage.getItem('authtoken')
        }
      }).then(response=>{
        if(response.data.status === "success"){
          _self.setState({
            AlertText: response.data.message,
            AlertTitle: "Event Registration",
            AlertStyle: "success",
            AlertConfirmButton: "OK",
            registered: false
          });
          _self.handleAlertShow();
        }
        else{
          _self.setState({
            AlertText: "Unexpected Error Occured",
            AlertTitle: "Event Registration",
            AlertStyle: "danger",
            AlertConfirmButton: "I Understand"
          });
          _self.handleAlertShow();
        }
      }).catch(error => {
        _self.setState({
          AlertText: "Unexpected Error Occured",
          AlertTitle: "Event Registration",
          AlertStyle: "danger",
          AlertConfirmButton: "I Understand"
        });
        _self.handleAlertShow();
      });
    }
    payRegFees(){
      let _self = this;
      axios({
        method: "post",
        url: "/event-reg/payment",
        data: {
          eventId: this.state.id,
          regFees: this.state.regFees
        },
        headers: {
          authtoken: localStorage.getItem("authtoken")
        }
      }).then(response => {
        if(response.data.status === "success"){
          window.open(response.data.longURL, "_self");
        }
        else{
          _self.setState({
            AlertText: "An Unexpected Error Occured.",
            AlertTitle: "Payment details",
            AlertStyle: "danger",
            AlertConfirmButton: "I Understand"
          });
          _self.handleAlertShow();
        }
      }).catch(error => {
        _self.setState({
          AlertText: "An Unexpected Error Occured.",
          AlertTitle: "Payment details",
          AlertStyle: "danger",
          AlertConfirmButton: "I Understand"
        });
        _self.handleAlertShow();
      })
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
        let elem1;
        let elem2;
        if(this.state.profile === "moderator"){
          elem1 = <Button variant="outline-info" onClick={()=>{window.open("/registration-list?eid="+this.state.id)}} block>
            Registered Users List
          </Button>;
          elem2 = (
            <Row>
              <Col xs={12} md={7}></Col>
              <Col xs={12} md={2} style={{padding: "0.2rem 1rem"}}>
                <a href={"/event-edit-pane?eid="+this.state.id} style={{textDecoration: "none"}}>
                  <Button variant="outline-info" block>
                    Edit
                  </Button>
                </a>
              </Col>
              <Col xs={12} md={2} style={{padding: "0.2rem 1rem"}}>
                <Button variant="outline-success" onClick={this.deleteEvent.bind(this)} block>
                  Delete
                </Button>
              </Col>
            </Row>
          );
        }
        else if(this.state.profile === "user"){
          elem1 = <span></span>;
          let timeArr = this.state.time.split(":");
          let dateArr = this.state.date.split("-");
          let datum = new Date(Date.UTC(dateArr[0], (parseInt(dateArr[1])-1).toString(), dateArr[2], timeArr[0], timeArr[1], '00'));
          console.log(datum);
          if((new Date()).getTime() - datum > 0){
            elem2 = (
              <Row></Row>
            );
          }
          else{
            elem2 = (
              <Row>
                <Col xs={12} md={7}></Col>
                {(this.state.registered && !this.state.payment_status)?<Col xs={12} md={2} style={{padding: "0.2rem 1rem"}}><Button variant="outline-success" onClick={this.payRegFees.bind(this)} block>Pay Now</Button></Col>:<Col xs={12} md={2}></Col>}
                {this.state.registered?<Col xs={12} md={2} style={{padding: "0.2rem 1rem"}}><Button variant="outline-success" onClick={this.unregister.bind(this)} block>Unregister</Button></Col>:<Col xs={12} md={2} style={{padding: "0.2rem 1rem"}}><Button variant="outline-info" onClick={this.register.bind(this)} block>Register</Button></Col>}
              </Row>
            );
          }

        }
        else if(this.state.profile === ""){
          elem1 = <span></span>;
          elem2 = <Row></Row>;
        }
        let event_time = this.state.time.split(":");
        let timeStr;
        if(parseInt(event_time[0]) > 12){
          timeStr = (parseInt(event_time[0])%12).toString() + ":" + event_time[1] + " PM";
        }
        else{
          timeStr = (parseInt(event_time[0])%12).toString() + ":" + event_time[1] + " AM";
        }
        let event_date = (new Date(this.state.date).toDateString()).split(" ");
        console.log(event_date);
        let dateStr = event_date[1]+ " " + event_date[2] + ", " + event_date[3];

        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                      <Row>
                        <Col xs={6} md={8}></Col>
                        <Col xs={6} md={3} style={{padding: "0.2rem 1rem"}}>
                          {elem1}
                        </Col>
                      </Row>
                      <Row style ={{padding: "1rem", margin: "0"}}>
                        <Col xs={12} md={3}>
                          <img className="w-100" src={process.env.PUBLIC_URL + "images/events/" + this.state.eventImg} />
                        </Col>
                        <Col xs={12} md={3}>
                          <center style={{fontSize:"0.9rem"}}><b>NAME OF THE EVENT</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.name}</center>
                          <center style={{fontSize:"0.9rem"}}><b>TIMING</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{dateStr}, {timeStr}</center>
                          <center style={{fontSize:"0.9rem"}}><b>VENUE</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.location}</center>
                        </Col>
                        <Col xs={12} md={3}>
                          <center style={{fontSize:"0.9rem"}}><b>A BRIEF INSIGHT</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem", textAlign: "justify"}}>
                            <p>
                              {this.state.description}
                            </p>
                          </center>
                        </Col>
                        <Col xs={12} md={3}>
                          <center style={{fontSize:"0.9rem"}}><b>EXTERNAL LINK</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.extLinks}</center>
                          <center style={{fontSize:"0.9rem"}}><b>REGISTRATION FEES</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>Rs. {this.state.regFees}</center>
                          <center style={{fontSize:"0.9rem"}}><b>ORGANISED BY</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.createdBy}</center>
                          <center style={{fontSize:"0.9rem"}}><b>ON BEHALF OF</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.onBehalfof}</center>
                        </Col>
                      </Row>
                      {elem2}
                  </div>
                <Footer />
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.deleteRecord.bind(this, this.state.id)}
                    onCancel={this.cancelDelete.bind(this)}
                    show={this.state.DeleteConfirmShow}
                >
                    You will not be able to recover.
                </SweetAlert>
                <SweetAlert
                    confirmBtnText={this.state.AlertConfirmButton}
                    title={this.state.AlertTitle}
                    type={this.state.AlertStyle}
                    onConfirm={this.handleAlertClose.bind(this)}
                    show={this.state.AlertShow}
                >
                    {this.state.AlertText}
                </SweetAlert>
            </Container>
        )
      }
    }
}

export default EventDisplay;
