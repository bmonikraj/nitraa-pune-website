import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import queryString from 'query-string';

class EachMemberDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          id: "",
          name: "",
          email: "",
          phone: "",
          dob: "",
          yop: "",
          branch: "",
          organization: "",
          present_address: "",
          permanent_address: "",
          due_timestamp: "",
          responseFetched: 0,
          cover_pic_ext: "",
          personalPicsArr: []
        }
    }

    componentDidMount(){
      console.log(this.props.location)
      var params = queryString.parse(this.props.location.search);
      if(params.mid){
        this.setState({
          id: params.mid
        });
      }

      if(localStorage.getItem("authtoken")){
        let _self = this;
        axios({
          method: "get",
          url: "/members-directory/"+params.mid
        }).then(response => {
          if(response.data.status === "success"){
            _self.setState({
              name:response.data.data.name,
              email:response.data.data.email,
              phone:response.data.data.phone,
              dob:response.data.data.dob,
              yop:response.data.data.yop,
              branch:response.data.data.branch,
              organization:response.data.data.organization,
              present_address:response.data.data.address,
              permanent_address:response.data.data.permanent_adr,
              due_timestamp:response.data.data.due_timestamp,
              responseFetched: 1,
              cover_pic_ext:response.data.data.cover_pic_ext,
              personalPicsArr: response.data.picsList
            });
          }
          else{
            _self.setState({
              responseFetched: 300
            });
          }
        }).catch(error =>{
          console.log(error);
          _self.setState({
            responseFetched: 300
          });
        })
      }
      else{
        this.setState({responseFetched: 404})
      }
    }

    render() {

      const styleTableDiv = {
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
                    <center><h4>Loading...</h4></center>
                  </div>
                <Footer />
            </Container>
        )
      }
      else if(this.state.responseFetched === 300){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                    <center><h4>Something went wrong! Please try again later..</h4></center>
                  </div>
                <Footer />
            </Container>
        )
      }
      else if(this.state.responseFetched === 404){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                    <center><h4>Sorry! Not Authorized to view this page..</h4></center>
                  </div>
                <Footer />
            </Container>
        )
      }
      else if(this.state.responseFetched === 1){
        let elem;
        if(this.state.personalPicsArr.length > 0){
          elem = (
            <Row>
              {this.state.personalPicsArr.map(item => {
                return (
                  <Col xs={12} md={3}>
                    <div>
                      <img className="w-100" src={process.env.PUBLIC_URL + "images/personal_pictures/" + item.imageFileName}/>
                    </div>
                  </Col>
                );
              })}
            </Row>
          )
        }
        else{
          elem = <Row><Col><center><h5>No photos posted yet</h5></center></Col></Row>;
        }
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                      <Row>
                        <Col xs={8} md={9}></Col>
                        <Col xs={3} md={3} style={{padding: "0.2rem 1rem"}}>
                          <Button variant="outline-info" onClick={()=>{window.open("/members-dir", "_self")}}>Back</Button>
                        </Col>
                      </Row>
                      <Row style ={{padding: "1rem", margin: "0"}}>
                        <Col xs={12} md={3} style={{marginBottom: "10px"}}>
                          {(this.state.cover_pic_ext === null)?<img className="w-100" src={process.env.PUBLIC_URL + "images/dummy.png"} />:<img className="w-100" src={process.env.PUBLIC_URL + "images/profile_pictures/" + this.state.id + "." + this.state.cover_pic_ext} />}
                        </Col>
                        <Col xs={12} md={4} style={{marginBottom: "10px"}}>
                          <center style={{fontSize:"0.9rem"}}><b>NAME</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.name}</center>
                          <center style={{fontSize:"0.9rem"}}><b>DATE OF BIRTH(yyyy-mm-dd)</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{(this.state.dob===""||this.state.dob===null)?"N/A":this.state.dob}</center>
                          <center style={{fontSize:"0.9rem"}}><b>EMAIL</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{this.state.email}</center>
                          <center style={{fontSize:"0.9rem"}}><b>PHONE</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{(this.state.phone==="")?"N/A":this.state.phone}</center>
                          <center style={{fontSize:"0.9rem"}}><b>PRESENT ADDRESS</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem", textAlign: "center"}}>
                            <p>
                              {(this.state.present_address === "")?"N/A":this.state.present_address}
                            </p>
                          </center>
                        </Col>

                        <Col xs={12} md={4} style={{marginBottom: "10px"}}>
                          <center style={{fontSize:"0.9rem"}}><b>PERMANENT ADDRESS</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem", textAlign: "center"}}>
                            <p>
                              {(this.state.permanent_address === "")?"N/A":this.state.permanent_address}
                            </p>
                          </center>
                          <center style={{fontSize:"0.9rem"}}><b>YEAR OF PASSING</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{(this.state.yop === "")?"N/A":(this.state.yop.split("-"))[0]}</center>
                          <center style={{fontSize:"0.9rem"}}><b>BRANCH</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{(this.state.branch === "")?"N/A":this.state.branch}</center>
                          <center style={{fontSize:"0.9rem"}}><b>ORGANIZATION CURRENTLY IN</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{(this.state.organization === "")?"N/A":this.state.organization}</center>
                          <center style={{fontSize:"0.9rem"}}><b>MEMBERSHIP STATUS</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey", marginBottom: "0.5rem"}}>{((this.state.due_timestamp < 0) || (parseInt(this.state.due_timestamp) - (new Date()).getTime() > 0))?"ACTIVE":"EXPIRED"}</center>
                        </Col>
                      </Row>
                      <hr/>
                      <center><h5>PICTURES POSTED</h5></center>
                      <hr/>
                      {elem}
                  </div>
                <Footer />
            </Container>
        )
      }
    }
}

export default EachMemberDetail;
