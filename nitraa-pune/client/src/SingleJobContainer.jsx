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

class SingleJobContainer extends React.Component {
  render() {
    let elem;
    if(this.props.editable){
      elem = (
        <div>
          <a href={"/job-edit-pane?jid="+this.props.jobId} style={{textDecoration: "none"}}><Button variant="outline-success">Edit</Button></a>
          <span> </span>
          <Button variant="outline-info" onClick={() => {this.props.deleteJob(this.props.jobId)}}>Delete</Button>
        </div>
      );
    }
    else{
      elem = (
        <div>
          <a href={"/jobPage?jid="+this.props.jobId} style={{textDecoration: "none"}}><Button variant="outline-info">View</Button></a>
        </div>
      );
    }

    return(
      <div style = {{backgroundColor: "#eee"}} cols = {5} value = {this.props.jobId}>
            <Row style = {{padding: "1rem 2rem"}}>
                <Col xs={12} md={9} style={{marginBottom: "0.5rem"}}>
                    <div style={{fontSize: "1.5rem"}}><a href ={"/jobPage?jid="+this.props.jobId}>{this.props.jobDetails.jobTitle}</a></div>
                    <div>
                      <div><b style={{fontSize: "0.85rem"}}>{this.props.jobDetails.jobCompanyName}</b></div>
                      <div>Location: <b style={{fontSize: "0.85rem"}}>{this.props.jobDetails.jobLocation}</b></div>
                      <div>Salary: <b style={{fontSize: "0.85rem"}}>{this.props.jobDetails.jobSalary}</b></div>
                    </div>
                </Col>
                <Col xs={12} md={3}>
                  {elem}
                </Col>
            </Row>
            <hr/>
      </div>
    )
  }
}

export default SingleJobContainer;
