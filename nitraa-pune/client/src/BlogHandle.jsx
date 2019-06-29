import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
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
import SingleBlogContainer from "./SingleBlogContainer";
import axios from 'axios';

class BlogHandle extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        blogListArray: [],
        arrayLength: 0,
        responseFetched: 0
      }

  }
  componentDidMount(){
    let _self_parent = this;
      axios({
        method: 'GET',
        url: '/blogs'
      }).then((response) => {
        console.log(response);
        if(response.data.status === "success"){
          _self_parent.setState({blogListArray: response.data.data, arrayLength: response.data.data.length, responseFetched: 1});
        }
        else{
          _self_parent.setState({responseFetched: 300});
        }
      }).catch((error) => {
        console.log(error);
        _self_parent.setState({responseFetched: 300});
      })
  }

  render() {
    if(this.state.responseFetched === 0){
      const styleTableDiv = {
          marginTop : '15vh',
          marginBottom : '15vh',
          padding: "10px",
          background: "#eee"
      }
      return(
        <Container>
          <Header/>
            <div style = {styleTableDiv}>
              <Row>
                <Col>
                <center><h2>Blogs</h2></center>
                </Col>
              </Row>
              <hr/>
              <Row style ={{padding: "1rem", margin: "0"}}>
                  <Col>
                    <center>Loading ...</center>
                  </Col>
              </Row>
            </div>
          <Footer/>
        </Container>
      )
    }
    else if(this.state.responseFetched === 300){
      const styleTableDiv = {
          marginTop : '15vh',
          marginBottom : '15vh',
          padding: "10px",
          background: "#eee"
      }
      return(
        <Container>
          <Header/>
            <div style = {styleTableDiv}>
              <Row>
                <Col>
                <center><h2>Blogs</h2></center>
                </Col>
              </Row>
              <hr/>
              <Row style ={{padding: "1rem", margin: "0"}}>
                  <Col>
                    <center>Something Went Wrong. Please try again later..</center>
                  </Col>
              </Row>
            </div>
          <Footer/>
        </Container>
      )
    }
    else if(this.state.responseFetched === 1){
      let elem = "";
      if(this.state.arrayLength){
          elem = this.state.blogListArray.map((item, index) => {
              return (<SingleBlogContainer
                blogDetails = {item}
                blogId = {item._id}
                key = {item._id}
                />);
          })
      }
      else{
        elem = <center>No blogs to display</center>
      }
      const styleTableDiv = {
          marginTop : '15vh',
          marginBottom : '15vh',
          padding: "10px",
          background: "#eee"
      }
      return(
        <Container>
          <Header/>
            <div style = {styleTableDiv}>
              <Row>
                <Col>
                <center><h2>Blogs</h2></center>
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
}
export default BlogHandle;
