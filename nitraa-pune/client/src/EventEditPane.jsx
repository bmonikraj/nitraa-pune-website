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
import $ from 'jquery';

class EventEditPane extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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
      ModeratorAlertText : "",
      ModeratorAlertShow : false,
      ModeratorAlertStyle : "danger",
      ModeratorAlertConfirmButton: "I Understand"
    }
    this.handleModeratorAlertClose = this.handleModeratorAlertClose.bind(this);
    this.handleModeratorAlertShow = this.handleModeratorAlertShow.bind(this);
  }
  handleModeratorAlertShow() {
      this.setState({ ModeratorAlertShow: true });
  }

  handleModeratorAlertClose() {
      var params = queryString.parse(this.props.location.search);
      this.setState({ ModeratorAlertShow: false });
      if(this.state.ModeratorAlertStyle === "success"){
        var params = queryString.parse(this.props.location.search);
        window.open("/eventPage?eid="+params.eid, "_self");
      }
  }
  componentDidMount(){
    var params = queryString.parse(this.props.location.search);
    if(params.eid && localStorage.getItem('profile') === "moderator"){
      this.setState({
        id: params.eid
      });
      var _self_parent = this;
      axios({
        method: 'GET',
        url: '/events/'+ params.eid,
      }).then(response => {
        if(response.data.status === "success"){
          _self_parent.setState({
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
          _self_parent.setState({
            responseFetched: 300
          });
        }
      }).catch(error =>{
        console.log(error);
        _self_parent.setState({
          responseFetched: 300
        });
      })
    }
    else{
      this.setState({responseFetched: 404});
    }
  }
  updateEvent(){
    var eventId = this.state.id;
    var eventName = this.state.name;
    var eventDate = this.state.date;
    var eventTime = this.state.time;
    var eventLocation = this.state.location;
    var eventDescription = this.state.description;
    var eventRegFees = this.state.regFees;
    var eventExtLinks = this.state.extLinks;
    var eventCreatedby = this.state.createdBy;
    var eventOnBehalfof = this.state.onBehalfof;
    var eventImage = $("#event-image")[0].files[0];
    if(eventId==="" || eventName==="" || eventDate==="" || eventTime==="" || eventLocation==="" || eventDescription==="" || eventRegFees==="" || eventExtLinks==="" || eventCreatedby==="" || eventOnBehalfof===""){
      this.setState({ModeratorAlertText : "One or more field(s) empty.", ModeratorAlertStyle : "danger", ModeratorAlertConfirmButton: "I Understand"});
      this.handleModeratorAlertShow();
    }
    else{
      if(eventImage){
        var formdata = new FormData();
        formdata.append("ImageFile", eventImage);
        formdata.append("id", eventId);
        formdata.append("eventName",eventName);
        formdata.append("eventDate",eventDate);
        formdata.append("eventTime",eventTime);
        formdata.append("eventLocation",eventLocation);
        formdata.append("eventDescription",eventDescription);
        formdata.append("eventExtLinks",eventExtLinks);
        formdata.append("eventRegFees",eventRegFees);
        formdata.append("eventCreatedby",eventCreatedby);
        formdata.append("eventOnBehalfof",eventOnBehalfof);
        var _self = this;
        axios({
          method: "PUT",
          url: "/events",
          data: formdata,
          headers: {
            authtoken: localStorage.getItem('authtoken'),
            'Content-Type': 'multipart/form-data'
          }
        }).then(response=>{
          if(response.data.status === "success"){
            _self.setState({ModeratorAlertText : "Event Details edited successfully.", ModeratorAlertStyle : "success", ModeratorAlertConfirmButton: "OK"});
            _self.handleModeratorAlertShow();
          }
          else{
            _self.setState({ModeratorAlertText : response.data.message, ModeratorAlertStyle : "danger", ModeratorAlertConfirmButton: "I Understand"});
            _self.handleModeratorAlertShow();
          }
        }).catch(error=>{
          console.log(error);
          _self.setState({ModeratorAlertText : "An Unexpected Error Occured.", ModeratorAlertStyle : "danger", ModeratorAlertConfirmButton: "I Understand"});
          _self.handleModeratorAlertShow();
        });
      }
      else{
        var _self = this;
        axios({
          method: 'PUT',
          url: "/events",
          data:{
            id:eventId,
            eventName:eventName,
            eventDate:eventDate,
            eventTime:eventTime,
            eventLocation:eventLocation,
            eventDescription:eventDescription,
            eventExtLinks:eventExtLinks,
            eventRegFees:eventRegFees,
            eventCreatedby:eventCreatedby,
            eventOnBehalfof:eventOnBehalfof
          },
          headers: {
            authtoken: localStorage.getItem('authtoken')
          }
        }).then(response=>{
          if(response.data.status === "success"){
            _self.setState({ModeratorAlertText : "Event Details edited successfully.", ModeratorAlertStyle : "success", ModeratorAlertConfirmButton: "OK"});
            _self.handleModeratorAlertShow();
          }
          else{
            _self.setState({ModeratorAlertText : response.data.message, ModeratorAlertStyle : "danger", ModeratorAlertConfirmButton: "I Understand"});
            _self.handleModeratorAlertShow();
          }
        }).catch(error=>{
          console.log(error);
          _self.setState({ModeratorAlertText : "An Unexpected Error Occured.", ModeratorAlertStyle : "danger", ModeratorAlertConfirmButton: "I Understand"});
          _self.handleModeratorAlertShow();
        });
      }
    }
  }
  changeName(event){
    console.log(event.target.value);
    this.setState({
      name: event.target.value
    });
  }
  changeDate(event){
    console.log(event.target.value);
    this.setState({
      date: event.target.value
    });
  }
  changeTime(event){
    console.log(event.target.value);
    this.setState({
      time: event.target.value
    });
  }

  changeLocation(event){
    console.log(event.target.value);
    this.setState({
      location: event.target.value
    });
  }
  changeDesc(event){
    console.log(event.target.value);
    this.setState({
      description: event.target.value
    });
  }
  changeExt(event){
    console.log(event.target.value);
    this.setState({
      extLInks: event.target.value
    });
  }
  changeRegFees(event){
    console.log(event.target.value);
    this.setState({
      regFees: event.target.value
    });
  }
  changeCreatedBy(event){
    console.log(event.target.value);
    this.setState({
      createdBy: event.target.value
    });
  }
  changeOnBehalfOf(event){
    console.log(event.target.value);
    this.setState({
      onBehalfof: event.target.value
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
                <center><h2>Edit Event</h2></center>
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
                <center><h2>Edit Event</h2></center>
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
                <center><h2>Edit Event</h2></center>
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
                <center><h2>Edit Event</h2></center>
              </Col>
            </Row>
            <div style = {{padding: '5px'}}>
              <Form>
                <Row>
                  <Col xs={12} md={3}>
                    <img
                      className="w-100"
                      src={process.env.PUBLIC_URL + "images/events/" + this.state.eventImg}
                      alt="image"
                    />
                  </Col>
                  <Col xs={12} md={9}>
                    <Row style ={{padding: "1rem"}}>
                      <Col md={3} style={{padding: "0.5rem 0.5rem"}}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id="event-name" placeholder = "Name" value={this.state.name} onChange={this.changeName.bind(this)} required></Form.Control>
                      </Col>
                      <Col md={3} style={{padding: "0.5rem 0.5rem"}}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" id = "event-date" placeholder = "Date" value={this.state.date} onChange={this.changeDate.bind(this)} required></Form.Control>
                      </Col>
                      <Col md={3} style={{padding: "0.5rem 0.5rem"}}>
                        <Form.Label>Time</Form.Label>
                        <Form.Control type = "time" id = "event-time" placeholder = "hrs:mins" value={this.state.time} onChange={this.changeTime.bind(this)} required></Form.Control>
                      </Col>
                      <Col md={3} style={{padding: "0.5rem 0.5rem"}}>
                        <Form.Label>Venue</Form.Label>
                        <Form.Control type = "text" id = "event-location" placeholder = "Location" value={this.state.location} onChange={this.changeLocation.bind(this)} required></Form.Control>
                      </Col>
                    </Row>

                    <Row style ={{padding: "1rem 1.5rem"}}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as = "textarea" rows = "3" type ="text" id = "event-description" placeholder = "Description" value={this.state.description} onChange={this.changeDesc.bind(this)} required></Form.Control>
                    </Row>

                    <Row style ={{padding: "1rem"}}>
                      <Col md={6} style={{padding: "0.5rem 0.5rem"}}>
                        <Form.Label>External Links</Form.Label>
                        <Form.Control type = "text" id = "event-external-links" placeholder = "External Links" value={this.state.extLinks} onChange={this.changeExt.bind(this)} required></Form.Control>
                      </Col>
                      <Col md={6} style={{padding: "0.5rem 0.5rem"}}>
                        <Form.Label>Registration Fees</Form.Label>
                        <Form.Control type = "text" id = "event-registration-fees" placeholder = "Registration Fees" value={this.state.regFees} onChange={this.changeRegFees.bind(this)}></Form.Control>
                      </Col>
                    </Row>

                    <Row style ={{padding: "1rem"}}>
                      <Col md={4} style={{padding: "0.5rem 0.5rem"}}>
                        <Form.Label>Organized by</Form.Label>
                        <Form.Control type = "text" id = "event-created-by" placeholder = "Organized By" value={this.state.createdBy} onChange={this.changeCreatedBy.bind(this)} required></Form.Control>
                      </Col>
                      <Col md={4} style={{padding: "0.5rem 0.5rem"}}>
                        <Form.Label>On Behalf of</Form.Label>
                        <Form.Control type = "text" id = "event-on-behalf-of" placeholder = "On Behalf of" value={this.state.onBehalfof} onChange={this.changeOnBehalfOf.bind(this)} required></Form.Control>
                      </Col>
                      <Col md={4} style={{padding: "0.5rem 0.5rem"}}>
                        <Form.Label>Change Picture</Form.Label>
                        <Form.Control type = "file" id = "event-image" required></Form.Control>
                      </Col>
                    </Row>

                    <Row style = {{padding: "1rem", margin: "0"}}>
                      <Button variant = "primary" onClick = {this.updateEvent.bind(this)}>Submit</Button>
                    </Row>

                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          <Footer/>
          <Sweetalert type={this.state.ModeratorAlertStyle} confirmBtnText={this.state.ModeratorAlertConfirmButton} confirmBtnBsStyle="primary" title="Moderator Utility" show={this.state.ModeratorAlertShow} onConfirm={this.handleModeratorAlertClose}>
              {this.state.ModeratorAlertText}
          </Sweetalert>
        </Container>
      )
    }
  }
}
export default EventEditPane;
