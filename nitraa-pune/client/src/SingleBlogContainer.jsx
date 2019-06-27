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

class SingleBlogContainer extends React.Component {
  render() {
    return(
      <div style = {{backgroundColor: "#eee"}} cols = {5} value = {this.props.blogId}>
            <Row style = {{padding: "1rem 2rem"}}>
                <Col xs={12} md={10} style={{marginBottom: "0.5rem"}}>
                    <div style={{fontSize: "1.5rem"}}><a href ={"/blogPage?bid="+this.props.blogId}>{this.props.blogDetails.blogTitle}</a></div>
                    <div>
                      <div>by:- <b style={{fontSize: "0.85rem"}}>{this.props.blogDetails.blogPostedby}</b></div>
                      <div>posted on: <b style={{fontSize: "0.85rem"}}>{this.props.blogDetails.blogPostedDate}</b></div>
                    </div>
                </Col>
                <Col xs={12} md={2}>
                  <div>
                    <a href={"/blogPage?bid="+this.props.blogId}><Button>View</Button></a>
                  </div>
                </Col>
            </Row>
            <hr/>
      </div>
    )
  }
}

export default SingleBlogContainer;
