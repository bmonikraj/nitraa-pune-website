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
import ModeratorSingleBlog from "./ModeratorSingleBlog";
import axios from 'axios';

class ModeratorBlogHandle extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        blogListArray: [],
        arrayLength: 0
      }

  }
  componentDidMount(){
    let _self_parent = this;
    if(localStorage.getItem('authtoken')){
      axios({
        method: 'GET',
        url: '/blogs',
        headers: {
          authtoken: localStorage.getItem('authtoken')
        }
      }).then((response) => {
        console.log(response);
        if(response.data.status === "success"){
          _self_parent.setState({blogListArray: response.data.data, arrayLength: response.data.data.length});
        }
      }).catch((error) => {
        console.log(error);
      })
    }
    else{
      alert('You are not logged in!!!');
    }
  }

  render() {
    let elem = "";
    if(this.state.arrayLength){
        elem = this.state.blogListArray.map((item, index) => {
            return (<ModeratorSingleBlog
              blogTitle = {item.blogTitle}
              blogDescription = {item.blogDescription}
              blogPostedby = {item.blogPostedby}
              blogDetails = {item}
              blogId = {index}
              key = {item._id}
              />);
        })
    }
    const styleTableDiv = {
        marginTop : '15vh',
        marginBottom : '15vh',
        background : "#eeeeee",
        padding: "10px"
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
export default ModeratorBlogHandle;
