import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import $ from 'jquery';

class AboutUs extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        responseFetched: 0,
        responseArr: []
      }
    }
    componentDidMount(){
      var _self = this;
      axios({
        method: "GET",
        url: "/members-directory"
      }).then(response => {
        if(response.data.status === "success"){
          _self.setState({
            responseFetched: 1,
            responseArr: response.data.data
          });
        }
        else{
          _self.setState({
            responseFetched: 300
          });
        }
      }).catch(error => {
        console.log(error);
        _self.setState({
          responseFetched: 300
        });
      });
    }
    render() {
      var styleTableDiv = {
          marginTop : '15vh',
          marginBottom : '15vh',
          background : "#eeeeee",
          padding: "10px"
      }
      if(this.state.responseFetched === 0){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                      <Row>
                        <Col style={{color: "#444"}}>
                          <center><h3><b>MEMBERS DIRECTORY</b></h3></center>
                        </Col>
                      </Row>
                      <hr/>
                      <Row style ={{padding: "1rem", margin: "0"}}>
                        <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                          <center><h5>Loading ...</h5></center>
                        </Col>
                      </Row>
                  </div>
                <Footer />
            </Container>
        );
      }
      else if(this.state.responseFetched === 300){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                      <Row>
                        <Col style={{color: "#444"}}>
                          <center><h3><b>MEMBERS DIRECTORY</b></h3></center>
                        </Col>
                      </Row>
                      <hr/>
                      <Row style ={{padding: "1rem", margin: "0"}}>
                        <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                          <center><h5>Something went wrong! Please try again later..</h5></center>
                        </Col>
                      </Row>
                  </div>
                <Footer />
            </Container>
        );
      }
      else if(this.state.responseFetched === 1){
        if(this.state.responseArr.length === 0){
          return (
              <Container>
                  <Header />
                    <div style = {styleTableDiv}>
                        <Row>
                          <Col style={{color: "#444"}}>
                            <center><h3><b>MEMBERS DIRECTORY</b></h3></center>
                          </Col>
                        </Row>
                        <hr/>
                        <Row style ={{padding: "1rem", margin: "0"}}>
                          <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                            <center><h5>No Records.</h5></center>
                          </Col>
                        </Row>
                    </div>
                  <Footer />
              </Container>
          );
        }
        else{
          styleTableDiv = {
              marginTop : '15vh',
              marginBottom : '15vh',
              background : "#eeeeee",
              padding: "5px"
          }
          return (
              <Container>
                  <Header />
                    <div style = {styleTableDiv}>
                        <Row>
                          <Col style={{color: "#444"}}>
                            <center><h3><b>MEMBERS DIRECTORY</b></h3></center>
                          </Col>
                        </Row>
                        <hr/>
                        <Row style ={{padding: "0.2rem", margin: "0"}}>
                          <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444", padding: "0"}}>
                            <Table responsive striped bordered hover variant="light">
                              <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Temporary Address</th>
                                    <th>Permanent Address</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.responseArr.map((item, index) => {
                                  return(
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address}</td>
                                        <td>{item.permanent_adr}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                    </div>
                  <Footer />
              </Container>
          );
        }
      }
    }
}

export default AboutUs;
