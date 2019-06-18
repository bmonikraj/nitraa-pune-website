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
import SingleJobDisplay from './SingleJobDisplay';
import axios from 'axios';

class JobDisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      jobListArray: [],
      arrayLength: 0
    }
  }
  componentDidMount(){
    let _self_parent = this;
    axios({
      method: 'GET',
      url: '/jobs'
    }).then((response) => {
      console.log(response);
      if(response.data.status === "success"){
        _self_parent.setState({jobListArray: response.data.data, arrayLength: response.data.data.length});
      }
    }).catch((error) => {
      console.log(error);
    })
  }
  render() {
    let elem = "";
    if(this.state.arrayLength){
      elem = this.state.jobListArray.map((item) => {
          return(<SingleJobDisplay
            key = {item._id}
            jodId = {item._id}
            jobTitle = {item.jobTitle}
            jobDescription = {item.jobDescription}
            jobApplicationLink = {item.jobApplicationLink}
            jobDeadline = {item.jobDeadline}
            jobCompanyName = {item.jobCompanyName}
            jobLocation = {item.jobLocation}
            jobDetails = {item}
            />);
      })
    }
    const style = {
      marginTop : '15vh',
      marginBottom : '15vh',
      background : "#eeeeee",
      padding: "10px"
    }
    return (
      <Container>
        <Header/>
          <div style = {style}>
            <Row>
              <Col>
              <center><h2>Jobs</h2></center>
              </Col>
            </Row>
            <hr/>
            <Row style ={{padding: "1rem", margin: "0"}}>
                <Col>
                  {elem}
                </Col>
            </Row>
          </div>
        <Footer/>
      </Container>
    )
  }
}

export default JobDisplay;
