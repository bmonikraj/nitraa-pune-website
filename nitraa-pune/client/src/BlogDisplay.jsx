import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';
import Sweetalert from 'react-bootstrap-sweetalert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import queryString from 'query-string';
import SingleBlogDisplay from './SingleBlogDisplay';

class BlogDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          blogListArray: [],
          arrayLength: 0
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
          _self_parent.setState({blogListArray: response.data.data, arrayLength: response.data.data.length});
        }
      }).catch((error) => {
        console.log(error);
      })
    }

    render() {
      let elem = "";
      if(this.state.arrayLength){
          elem = this.state.blogListArray.map((item, index) => {
              return (<SingleBlogDisplay
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

        return (
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

export default BlogDisplay;
