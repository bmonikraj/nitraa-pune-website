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
import ReactDataGrid from 'react-data-grid';

class AboutUs extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        responseFetched: 0,
        responseArr: []
      }
    }
    rowClicked(){
      window.open("https://youtube.com");
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
      const columns = [
        { key: 'id', name: '#',width: 100 },
        { key: 'name', name: 'Name', width: 200 },
        { key: 'DOB', name: 'DOB', width: 130 },
        { key: 'YOP', name: 'YOP', width: 80 },
        { key: 'Email', name: 'Email' , width: 220 },
        { key: 'Mobile', name: 'Mobile' , width: 170 },
        { key: 'TempAddr', name: 'Temporary Address' , width: 300, resizable:true },
        { key: 'PerAddr', name: 'Permanent Address', width: 300, resizable:true },
        { key: 'Spouse', name: 'Spouse' , width: 200},
        { key: 'Children', name: 'Children', width: 300, resizable:true},
        { key: 'Hobbies', name: 'Hobbies', width: 300, resizable:true },];

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
          let rows = [];
          this.state.responseArr.map((item, index) => {
                let tempObj = {id:"", name:"", DOB:"", YOP:"", Email:"", Mobile:"", TempAddr:"", PerAddr:"", Spouse:"", Children:"", Hobbies:"" };
                tempObj['id'] = index+1;
                tempObj['name'] = item.name;
                tempObj['DOB'] = item.dob;
                tempObj['YOP'] = item.yop;
                tempObj['Email'] = item.email;
                tempObj['Mobile'] = item.phone;
                tempObj['TempAddr'] = item.address;
                tempObj['PermAddr'] = item.permanent_adr;
                tempObj['Spouse'] = item.spouse_name;
                tempObj['Children'] = item.children;
                tempObj['Hobbies'] = item.hobbies;
                rows.push(tempObj);
          });
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
                          <ReactDataGrid
                          columns={columns}
                          rowGetter={i => rows[i]}
                          rowsCount={this.state.responseArr.length}
                          onRowClick = {this.rowClicked.bind(this)}
                          minHeight={150} />
                    </div>
                  <Footer />
              </Container>
          );
        }
      }
    }
}

export default AboutUs;
