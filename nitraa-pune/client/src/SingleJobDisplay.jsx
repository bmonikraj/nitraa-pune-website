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

class SingleJobDisplay extends React.Component {
  render() {
    return(
      <div style = {{backgroundColor: "grey"}} cols = {5}>
        <Container fluid = {true}>
            <Row>
                <Col>
                    <Col md = "auto">
                      <div>Job Title: <a href = "#" style  = {{color: "white"}}>{this.props.jobTitle}</a></div>
                      <div>Job Description: {this.props.jobDescription}</div>
                      <div>Application Link: <a href = "#" style  = {{color: "white"}}>{this.props.jobApplicationLink}</a></div>
                    </Col>
                </Col>
                <Col>
                  <div>DeadLine: {this.props.jobDeadline}</div>
                  <div>Company Name: {this.props.jobCompanyName}</div>
                  <div>Location: {this.props.jobLocation}</div>
                </Col>
            </Row>
        </Container>
        <hr/>
      </div>
    )
  }
}

export default SingleJobDisplay;
