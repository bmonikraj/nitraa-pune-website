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

class SingleEventRow extends React.Component {
  render() {
    let event_time = this.props.eventDetails.eventTime.split(":");
    let timeStr;
    if(parseInt(event_time[0]) > 12){
      timeStr = (parseInt(event_time[0])%12).toString() + ":" + event_time[1] + " PM";
    }
    else{
      timeStr = (parseInt(event_time[0])%12).toString() + ":" + event_time[1] + " AM";
    }
    let event_date = (new Date(this.props.eventDetails.eventDate).toDateString()).split(" ");
    console.log(event_date);
    let dateStr = event_date[1]+ " " + event_date[2] + ", " + event_date[3];
    return(
          <Col xs={12} md={4}>
              <Card width = "10">
                <CardBody>
                  <CardImg src={process.env.PUBLIC_URL+'images/events/'+this.props.eventId+'.'+this.props.eventDetails.event_image_ext} alt="Card image cap"/>
                  <CardTitle><center style={{marginTop: "1rem"}}><h5><CardLink href = {"/eventPage?eid="+this.props.eventId}>{this.props.eventDetails.eventName}</CardLink></h5></center></CardTitle>
                  <CardText style={{fontSize: "0.8rem"}}><center><b>TIME</b></center> <center style={{color: "grey"}}>{dateStr}, {timeStr}</center></CardText>
                  <CardText style={{fontSize: "0.8rem"}}><center><b>VENUE</b></center> <center style={{color: "grey"}}>{this.props.eventDetails.eventLocation}</center></CardText>
                    <div>
                        <a href={"/eventPage?eid="+this.props.eventId} style={{textDecoration: "none"}}><Button variant="outline-info" block>View</Button></a>
                    </div>
                </CardBody>
              </Card>
          </Col>
    )
  }
}

export default SingleEventRow;
