import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink } from 'reactstrap';
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

class ModeratorSingleEvent extends React.Component {
  render() {
    return(
          <Container fluid = {true}>
              <Card width = "10">
                <CardBody>
                  <CardImg width = "0.5" height = "150" src={process.env.PUBLIC_URL + 'images/events_medium.jpg'} alt="Card image cap"/>
                  <CardTitle><CardLink href = "#">Event Name: {this.props.eventName}</CardLink></CardTitle>
                  <CardText>Date: {this.props.eventDate} Time: {this.props.eventTime}</CardText>
                  <CardText>Event Description: {this.props.eventDescription} <a href = "#">[More...]</a></CardText>
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

export default ModeratorSingleEvent;
