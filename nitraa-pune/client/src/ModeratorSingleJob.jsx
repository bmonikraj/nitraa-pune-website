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

class ModeratorSingleJob extends React.Component {
  render() {
    return(
      <Container style = {{marginTop: "10vh", padding: '5px'}}>
        <Card width = "5">
          <CardBody>
            <CardTitle>Job Title: <CardLink href = "#">{this.props.jobTitle}</CardLink></CardTitle>
            <CardText>Job Description: {this.props.jobDescription}</CardText>
            <CardText>Company Name: {this.props.jobCompanyName}</CardText>
            <CardText>Deadline: {this.props.jobDeadline}</CardText>
            <CardText>Location: {this.props.jobLocation}</CardText>
              <div>
                  <Button className="float-left">Edit</Button>&nbsp;
                  <Button>Delete</Button>
              </div>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

export default ModeratorSingleJob;
