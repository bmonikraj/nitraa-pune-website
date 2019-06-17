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
import Image from 'react-bootstrap/Image';

class ModeratorSingleBlog extends React.Component {
  render() {
    return(
      <div style = {{backgroundColor: "#25274d"}} cols = {5} value = {this.props.blogId}>
        <Container fluid = {true}>
            <Row>
                <Col xs={6} md={4} style = {{padding: "5px"}}>
                  <Image alt = "image" src = {process.env.PUBLIC_URL + 'images/events_medium.jpg'} thumbnail/>
                </Col>
                <Col style = {{padding: "50px"}}>
                    <Col style = {{color: "white"}}>Title:- <a href = "#" style  = {{color: "white"}}>{this.props.blogTitle}</a></Col>
                    <Col md = "auto" style = {{color: "white"}}>
                      <div>Blog Posted by: {this.props.blogPostedby}</div>
                      <div>Blog Description: {this.props.blogDescription}</div>
                    </Col>
                </Col>
                <Row>
                  <div>
                    <Button>Edit</Button> &nbsp;
                    <Button>Delete</Button>
                  </div>
                </Row>
            </Row>
        </Container>
        <hr/>
      </div>
    )
  }
}

export default ModeratorSingleBlog;
