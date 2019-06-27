import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import queryString from 'query-string';
import axios from 'axios';
import ReactToPrint from 'react-to-print';

class EventRegTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      responseFetched: 0,
      responseArr: []
    }
  }
  componentDidMount(){
    var params = queryString.parse(this.props.location.search);
    if(localStorage.getItem('profile') === "moderator"){
      if(params.eid){
        var _self = this;
        axios({
          method: 'GET',
          url: '/event-reg/'+params.eid
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
          _self.setState({
            responseFetched: 300
          });
        })
      }
      else{
        this.setState({
          responseFetched: 300,
        })
      }
    }
    else{
      this.setState({
        responseFetched: 404
      });
    }
  }
  render(){
    if(this.state.responseFetched === 0){
      return (<center style={{backgroundColor:"white"}}><h2>Loading ...</h2></center>);
    }
    else if(this.state.responseFetched === 300){
      return (<center style={{backgroundColor:"white"}}><h2>Something went wrong! Please try again later.</h2></center>);
    }
    else if(this.state.responseFetched === 404){
      return (<center style={{backgroundColor:"white"}}><h2>Not Authorized!</h2></center>);
    }
    else if(this.state.responseFetched === 1){
      if(this.state.responseArr.length === 0){
        return (<center style={{backgroundColor:"white"}}><h2>No Registrations!</h2></center>);
      }
      else{
        return (
          <Container fluid={true} style={{backgroundColor: "white"}}>
            <Row>
              <Col xs={12} ref={el => (this.componentRef = el)}>
                <Table style={{ marginTop: "2rem"}} bordered>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.responseArr.map(item => {
                      return (
                        <tr>
                          <td>{item.userName}</td>
                          <td>{item.userEmail}</td>
                          <td>{item.userPhone}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
              <Col xs={12} style={{textAlign: "right"}}>
                  <ReactToPrint
                    trigger={() => <a href="javascript:void(0)"><i className="fa fa-save"></i> Print Invoice</a>}
                    content={() => this.componentRef}
                  />
              </Col>
            </Row>
          </Container>
        )
      }
    }
  }
}

export default EventRegTable;
