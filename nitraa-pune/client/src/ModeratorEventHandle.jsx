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
import ModeratorSingleEvent from './ModeratorSingleEvent';
import axios from 'axios';

class ModeratorEventHandle extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        eventListArray: [],
        arrayLength: 0
      }

  }
  componentDidMount(){
    let _self_parent = this;
    if(localStorage.getItem('authtoken')){
      axios({
        method: 'GET',
        url: '/events',
        headers: {
          authtoken: localStorage.getItem('authtoken')
        }
      }).then((response) => {
        console.log(response);
        if(response.data.status === "success"){
          _self_parent.setState({eventListArray: response.data.data, arrayLength: response.data.data.length});
          console.log(response.data.data);
        }
      }).catch((error) => {
        console.log(error);
      })
    }
    else{
      alert('You are not logged in!!!');
    }
  }
  render() {
    let elem = "";
    if(this.state.arrayLength){
      elem = this.state.eventListArray.map((item, index) => {
          return (<ModeratorSingleEvent
            eventName = {item.eventName}
            eventDescription = {item.eventDescription}
            eventDate = {item.eventDate}
            eventTime = {item.eventTime}
            eventDetails = {item}
            eventId = {index}
            key = {item._id}
            />);
      });
    }
    return(
      <Container>
        <Header/>
            <Container style = {{marginTop: "20vh", padding: 0}}>
              {elem}
            </Container>
        <Footer/>
      </Container>
    )
  }
}
export default ModeratorEventHandle;
