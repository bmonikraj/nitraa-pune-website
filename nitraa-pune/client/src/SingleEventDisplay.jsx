import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'reactstrap';
import Button from 'react-bootstrap/Button';
import MaterialIcons from 'material-icons-react';
import Figure from 'react-bootstrap/Figure';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import Sweetalert from 'react-bootstrap-sweetalert';

class SingleEventDisplay extends React.Component {
  render() {
    return(
        <div style = {{backgroundColor: "#25274d"}} cols = {5} value = {this.props.eventId}>
          <Container fluid = {true}>
              <Row>
                  <Col xs={6} md={4} style = {{padding: "10px"}}>
                    <Image alt = "image" src = {process.env.PUBLIC_URL + 'images/events_medium.jpg'} thumbnail/>
                  </Col>
                  <Col style = {{padding: "50px"}}>
                      <Col style = {{color: "white"}}>Date:- {this.props.eventDate}</Col>
                      <Col style = {{color: "white"}}>Time:- {this.props.eventTime}</Col>
                      <Col md = "auto" style = {{color: "white"}}>
                        <div>Event Name: <a href = "#" style  = {{color: "white"}}>{this.props.eventName}</a></div>
                        <div>Event Description: {this.props.eventDescription}</div>
                      </Col>
                  </Col>
              </Row>
          </Container>
          <hr/>
        </div>
    )
  }
}

export default SingleEventDisplay;
