import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';
import Sweetalert from 'react-bootstrap-sweetalert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import queryString from 'query-string';
import SingleEventDisplay from './SingleEventDisplay';
import PastEventDisplay from './PastEventDisplay';

class EventDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          eventListArray: [],
          arrayLength: 0
        }

    }
    componentDidMount(){
      let _self_parent = this;
      axios({
        method: 'GET',
        url: '/events'
      }).then((response) => {
        console.log(response);
        if(response.data.status === "success"){
          _self_parent.setState({eventListArray: response.data.data, arrayLength: response.data.data.length});
          console.log(response.data.data);
        }
      }).catch((error) => {
        console.log(error);
      });
    }

    render() {
      let elem = "";
      if(this.state.arrayLength){
          elem = this.state.eventListArray.map((item, index) => {
            //condition to check for upcoming events and past events
            //if((item.limit !== null) || item !== '' && moment.isAfter(item.eventDate)){
              return (<SingleEventDisplay
                eventName = {item.eventName}
                eventDescription = {item.eventDescription}
                eventDate = {item.eventDate}
                eventTime = {item.eventTime}
                eventDetails = {item}
                eventId = {index}
                key = {item._id}
                />);
          //  }else{
              {/*return(<PastEventDisplay
                eventName = {item.eventName}
                eventDescription = {item.eventDescription}
                eventDate = {item.eventDate}
                eventTime = {item.eventTime}
                eventDetails = {item}
                eventId = {index}
                key = {item._id}
                />);
            }*/}
          })
      }
      const styleTableDiv = {
          marginTop : '15vh',
          marginBottom : '15vh',
          background : "#eeeeee",
          padding: "10px"
      }

        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                    <Tabs defaultActiveKey = "upcomingEvents">
                        <Tab eventKey="upcomingEvents" title="Upcoming Events">
                            <Row style ={{padding: "1rem", margin: "0"}}>
                                <Col>
                                  {elem}
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey = "pastEvents" title="Past Events">
                            <Row style ={{padding: "1rem", margin: "0"}}>
                                <Col>
                                  <PastEventDisplay/>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                  </div>
                <Footer />
            </Container>
        )
    }
}

export default EventDisplay;
