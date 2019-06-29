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

class AboutUs extends React.Component {
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
                        <center><h3><b>ABOUT US</b></h3></center>
                      </Col>
                    </Row>
                    <hr/>
                    <Row style ={{padding: "1rem", margin: "0"}}>
                      <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                        <p>
                          <b>National Institute of Technology Rourkela Alumni Association (NITRAA), Pune</b> is a local Chapter formed with an approval from the Executive Committee and it’s controlled by the elected members of the <b>Local Council (LC).</b> The Chapter has framed <b>“Rules of Business” / “Bye Laws”</b> of its own, within the frame-work of the constitution of the Association and without violating any of its provisions.
                        </p>
                        <p>
                          The role of the Pune Chapter and its parent organization: National Institute of Technology Rourkela Alumni Association (NITRAA), formerly known as <b>Old Boys Association (OBA) / Regional Engineering College, Rourkela Alumni Association</b> is for:
                        </p>
                        <ul>
                          <li>Promote professional, social and intellectual interaction amongst the members, and between members and the Alma Mater and the Society at large.</li>
                          <li>Forge cordial links among the members, and between the members and the Alma Mater.</li>
                          <li>Promote and propagate the achievements of the members and the Alma Mater through exhibitions, newsletters, media, electronic mail etc.</li>
                          <li>Promote academic and professional excellence by organising or sponsoring seminars / conferences / guest lectures / publications etc for benefit of society at large.</li>
                          <li>Organize cultural, recreational, social, professional and developmental activities beneficial to the members, Alma Mater and the Society at large.</li>
                          <li>Provide career guidance in both academic and extra-curricular field to the public at large and students of the Alma Mater and create opportunities for transfer of technology / knowledge amongst the members and the Alma Mater.</li>
                          <li>Advance contemporary technical education through establishment of chairs, centres, schools, scholarships, awards etc at the Alma Mater.</li>
                          <li>Facilitate employment / campus placement for the members and public at large through the good offices of the Alumni.</li>
                          <li>Propagate ideas of the Association through establishment of Chapters within and outside India.</li>
                          <li>Encourage advancement of Science and Technology through Industry-Academic interaction and sponsored project.</li>
                          <li>Interact with other similar Alumni Associations on common issues.</li>
                        </ul>
                      </Col>
                    </Row>
                </div>
              <Footer />
          </Container>
      );
    }
}

export default AboutUs;
