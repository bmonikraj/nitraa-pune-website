import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
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
import SingleEventRow from './SingleEventRow';
import axios from 'axios';

class EventHandle extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        eventListArray: [],
        responseFetched: 0
      }

  }
  componentDidMount(){
    if(localStorage.getItem("authtoken")){
      let _self_parent = this;
      axios({
        method: 'GET',
        url: '/events'
      }).then((response) => {
        console.log(response);
        if(response.data.status === "success"){
          _self_parent.setState({eventListArray: response.data.data, responseFetched: 1});
          console.log(response.data.data);
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
      this.setState({
        responseFetched: 404
      })
    }
  }
  render(){
    if(this.state.responseFetched){
      if(this.state.responseFetched === 1){
        let elemPast;
        let elemUpcoming;
        let upcoming = [];
        let past = [];
        this.state.eventListArray.map(item => {
          let timeArr = item.eventTime.split(":");
          let dateArr = item.eventDate.split("-");
          let datum = new Date(Date.UTC(dateArr[0], (parseInt(dateArr[1])-1).toString(), dateArr[2], timeArr[0], timeArr[1], '00'));
          console.log(datum);
          if((new Date()).getTime() - datum > 0){
            past.push(item);
          }
          else{
            upcoming.push(item);
          }
        });
        if(upcoming.length){
            elemUpcoming = upcoming.map((item, index) => {
                return (<SingleEventRow
                  eventDetails = {item}
                  eventId = {item._id}
                  key = {item._id}
                />);
            });
        }
        else{
          elemUpcoming = <Col><center style={{color: "white"}}>No Events to display</center></Col>
        }

        if(past.length){
            elemPast = past.map((item, index) => {
                return (<SingleEventRow
                  eventDetails = {item}
                  eventId = {item._id}
                  key = {item._id}
                />);
            });
        }
        else{
          elemPast = <Col><center style={{color: "white"}}>No Events to display</center></Col>
        }
        return(
          <Container>
            <Header/>
                <Row style = {{margin: "20vh 0 0", padding: 0, fontFamily: "Lato, sans-serif"}}>
                  <Col>
                  <center><h2 style={{color: "white"}}>Upcoming Events</h2></center>
                  </Col>
                </Row>
                <hr style={{backgroundColor: "white"}}/>
                <Row style={{padding: 0, fontFamily: "Lato"}}>
                  {elemUpcoming}
                </Row>
                <hr style={{backgroundColor: "white"}}/>
                <Row style = {{padding: 0, fontFamily: "Lato, sans-serif"}}>
                  <Col>
                  <center><h2 style={{color: "white"}}>Past Events</h2></center>
                  </Col>
                </Row>
                <hr style={{backgroundColor: "white"}}/>
                <Row style={{marginBottom: "20vh", padding: 0, fontFamily: "Lato"}}>
                  {elemPast}
                </Row>
            <Footer/>
          </Container>
        )
      }
      else if(this.state.responseFetched === 300){
        //something went wrong
        return(
          <Container>
            <Header/>
                <Row style={{margin: "20vh 0 0", padding: 0, fontFamily: "Lato"}}>
                  <h4 style={{color: "white"}}>Something went wrong! Please try again..</h4>
                </Row>
            <Footer/>
          </Container>
        );
      }
      else if(this.state.responseFetched === 404){
        //something went wrong
        return(
          <Container>
            <Header/>
                <Row style={{margin: "20vh 0 0", padding: 0, fontFamily: "Lato"}}>
                  <h4 style={{color: "white"}}>Sorry! Not Authorized to view this page..</h4>
                </Row>
            <Footer/>
          </Container>
        );
      }
  }
  else{
    return(
      <Container>
        <Header/>
            <Row style={{margin: "0 0 20vh", padding: 0, fontFamily: "Lato"}}>
              <h4 style={{color: "white"}}>Loading ...</h4>
            </Row>
        <Footer/>
      </Container>
    )
  }
  }
}
export default EventHandle;
