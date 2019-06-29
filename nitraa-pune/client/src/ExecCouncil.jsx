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

class ExecCouncil extends React.Component {
    render() {

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
                    <Row>
                      <Col style={{color: "#444"}}>
                        <center><h3><b>EXECUTIVE COUNCIL</b></h3></center>
                      </Col>
                    </Row>
                    <hr/>
                    <Row style ={{padding: "1rem", margin: "0"}}>
                      <Col xs={12} style={{marginTop: "1rem"}}>
                        <hr/>
                        <center><h4><b>CHAIRMAN</b></h4></center>
                        <hr/>
                        <div style={{marginTop: "0.5rem", marginBottom: "1.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>RAJIB JENA</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>jenarajibkumar@gmail.com / +91-9890500022</center>
                        </div>
                        <hr/>
                        <center><h4><b>VICE-CHAIRMEN</b></h4></center>
                        <hr/>
                        <div style={{marginTop: "0.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>RATAN MOHAPATRA</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>ratan.mohapatra@hotmail.com / +91-9011008722</center>
                        </div>
                        <div style={{marginTop: "0.5rem", marginBottom: "1.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>ANIRBAN MUKHERJI</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>anirban.mukherji@schaeffler.com / +91-9881729783</center>
                        </div>
                        <hr/>
                        <center><h4><b>SECRETARY</b></h4></center>
                        <hr/>
                        <div style={{marginTop: "0.5rem", marginBottom: "1.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>GAURESH R. KHANOLKAR</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>gaureshkhanolkar11@gmail.com / +91-9769771203</center>
                        </div>
                        <hr/>
                        <center><h4><b>JOINT-SECRETARIES</b></h4></center>
                        <hr/>
                        <div style={{marginTop: "0.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>NITIKA GUPTA</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>nitikagupta0303@gmail.com / +91-9890098025</center>
                        </div>
                        <div style={{marginTop: "0.5rem", marginBottom: "1.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>VIPUL RANJAN</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>vipul.s.paul@gmail.com / +91-8596954220</center>
                        </div>
                        <hr/>
                        <center><h4><b>TREASURER</b></h4></center>
                        <hr/>
                        <div style={{marginTop: "0.5rem", marginBottom: "1.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>RAMAKANT BEHERA</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>ramakant12@gmail.com / +91-9850522444</center>
                        </div>
                        <hr/>
                        <center><h4><b>HEAD(CULTURAL COMMITTEE)</b></h4></center>
                        <hr/>
                        <div style={{marginTop: "0.5rem", marginBottom: "1.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>GANESH RAGHAVAN</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>ganeshraghavan@hotmail.com / +91-7506356832</center>
                        </div>
                        <hr/>
                        <center><h4><b>HEAD(WELLNESS AND FITNESS)</b></h4></center>
                        <hr/>
                        <div style={{marginTop: "0.5rem", marginBottom: "1.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>SURENDRA TRIPATHY</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>surentrip@gmail.com / +91-9823419739</center>
                        </div>
                        <hr/>
                        <center><h4><b>MEMBERS EC</b></h4></center>
                        <hr/>
                        <div style={{marginTop: "0.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>AMRUTHA VARSHINI</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>amruthavarshinimahankali@gmail.com / +91-7205210640</center>
                        </div>
                        <div style={{marginTop: "0.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>PRANJALI MISHRA</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>pranzali@gmail.com / +91-9776461254</center>
                        </div>
                        <div style={{marginTop: "0.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>ARCHANA RATH</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>archanar.78@gmail.com / +91-8093518631</center>
                        </div>
                        <div style={{marginTop: "0.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>ADITI ACHARYA</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>aditiacharya2810@gmail.com / +91-7873831541</center>
                        </div>
                        <div style={{marginTop: "0.5rem", marginBottom: "1.5rem"}}>
                          <center style={{fontSize: "1rem", color: "#444"}}><b>PUNJAYA DASH</b></center>
                          <center style={{fontSize: "0.8rem", color: "grey"}}>punjaya.dash@gmail.com / +91-9938458126</center>
                        </div>
                        <hr/>
                      </Col>
                    </Row>
                </div>
              <Footer />
          </Container>
      );
    }
}

export default ExecCouncil;
