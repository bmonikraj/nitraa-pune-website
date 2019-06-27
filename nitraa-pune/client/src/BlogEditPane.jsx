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
import axios from 'axios';
import queryString from 'query-string';
import $ from 'jquery';

class BlogEditPane extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      postedBy: "",
      blogImg: "",
      ModeratorAlertText : "",
      ModeratorAlertShow : false,
      ModeratorAlertStyle : "danger",
      ModeratorAlertConfirmButton: "I Understand",
      responseFetched: 0
    }
    this.handleModeratorAlertClose = this.handleModeratorAlertClose.bind(this);
    this.handleModeratorAlertShow = this.handleModeratorAlertShow.bind(this);
  }
  handleModeratorAlertShow() {
      this.setState({ ModeratorAlertShow: true });
  }

  handleModeratorAlertClose() {
      var params = queryString.parse(this.props.location.search);
      this.setState({ ModeratorAlertShow: false });
      if(this.state.ModeratorAlertStyle === "success"){
        var params = queryString.parse(this.props.location.search);
        window.open("/blogPage?bid="+params.bid, "_self");
      }
  }
  componentDidMount(){
    var params = queryString.parse(this.props.location.search);
    if(params.bid && localStorage.getItem('profile') === "moderator"){
      this.setState({
        id: params.bid
      });
      var _self_parent = this;
      axios({
        method: 'GET',
        url: '/blogs/'+ params.bid,
      }).then(response => {
        if(response.data.status === "success"){
          _self_parent.setState({
            title: response.data.data.blogTitle,
            description: response.data.data.blogDescription,
            postedBy: response.data.data.blogPostedby,
            blogImg: params.bid + "." + response.data.data.blog_image_ext,
            responseFetched: 1
          });
        }
        else{
          _self_parent.setState({
            responseFetched: 300
          });
        }
      }).catch(error =>{
        console.log(error);
        _self_parent.setState({
          responseFetched: 300
        });
      })
    }
    else{
      this.setState({responseFetched: 404});
    }
  }
  updateBlog(){
    var blogId = this.state.id;
    var blogTitle = this.state.title;
    var blogDescription = this.state.description;
    var blogPostedby = this.state.postedBy;
    var blogImage = $("#blog-image")[0].files[0];
    if(blogId==="" || blogTitle==="" || blogDescription==="" || blogPostedby===""){
      this.setState({ModeratorAlertText : "One or more field(s) empty.", ModeratorAlertStyle : "danger", ModeratorAlertConfirmButton: "I Understand"});
      this.handleModeratorAlertShow();
    }
    else{
      if(blogImage){
        var formdata = new FormData();
        formdata.append("ImageFile", blogImage);
        formdata.append("id", blogId);
        formdata.append("blogTitle",blogTitle);
        formdata.append("blogDescription",blogDescription);
        formdata.append("blogPostedby",blogPostedby);
        var _self = this;
        axios({
          method: "PUT",
          url: "/blogs",
          data: formdata,
          headers: {
            authtoken: localStorage.getItem('authtoken'),
            'Content-Type': 'multipart/form-data'
          }
        }).then(response=>{
          if(response.data.status === "success"){
            _self.setState({ModeratorAlertText : "Blog Details edited successfully.", ModeratorAlertStyle : "success", ModeratorAlertConfirmButton: "OK"});
            _self.handleModeratorAlertShow();
          }
          else{
            _self.setState({ModeratorAlertText : response.data.message, ModeratorAlertStyle : "danger", ModeratorAlertConfirmButton: "I Understand"});
            _self.handleModeratorAlertShow();
          }
        }).catch(error=>{
          console.log(error);
          _self.setState({ModeratorAlertText : "An Unexpected Error Occured.", ModeratorAlertStyle : "danger", ModeratorAlertConfirmButton: "I Understand"});
          _self.handleModeratorAlertShow();
        });
      }
      else{
        var _self = this;
        axios({
          method: 'PUT',
          url: "/blogs",
          data:{
            id:blogId,
            blogTitle:blogTitle,
            blogDescription:blogDescription,
            blogPostedby:blogPostedby
          },
          headers: {
            authtoken: localStorage.getItem('authtoken')
          }
        }).then(response=>{
          if(response.data.status === "success"){
            _self.setState({ModeratorAlertText : "Blog Details edited successfully.", ModeratorAlertStyle : "success", ModeratorAlertConfirmButton: "OK"});
            _self.handleModeratorAlertShow();
          }
          else{
            _self.setState({ModeratorAlertText : response.data.message, ModeratorAlertStyle : "danger", ModeratorAlertConfirmButton: "I Understand"});
            _self.handleModeratorAlertShow();
          }
        }).catch(error=>{
          console.log(error);
          _self.setState({ModeratorAlertText : "An Unexpected Error Occured.", ModeratorAlertStyle : "danger", ModeratorAlertConfirmButton: "I Understand"});
          _self.handleModeratorAlertShow();
        });
      }
    }
  }
  changeTitle(event){
    console.log(event.target.value);
    this.setState({
      title: event.target.value
    });
  }
  changeDescription(event){
    console.log(event.target.value);
    this.setState({
      description: event.target.value
    });
  }
  changePostedBy(event){
    console.log(event.target.value);
    this.setState({
      postedBy: event.target.value
    });
  }
  render() {
    const styleTableDiv = {
        marginTop : '15vh',
        marginBottom : '15vh',
        padding: "10px",
        background: "#eee"
    }
    if(this.state.responseFetched === 0){
      return(
        <Container>
          <Header/>
          <div style = {styleTableDiv}>
            <Row>
              <Col>
                <center><h2>Edit Blog</h2></center>
              </Col>
            </Row>
            <div style = {{padding: '5px'}}>
              <center><h4>Loading ...</h4></center>
            </div>
          </div>
          <Footer/>
        </Container>
      )
    }
    else if(this.state.responseFetched === 404){
      return(
        <Container>
          <Header/>
          <div style = {styleTableDiv}>
            <Row>
              <Col>
                <center><h2>Edit Blog</h2></center>
              </Col>
            </Row>
            <div style = {{padding: '5px'}}>
              <center><h4>Not authorized to perform this action.</h4></center>
            </div>
          </div>
          <Footer/>
        </Container>
      )
    }
    else if(this.state.responseFetched === 300){
      return(
        <Container>
          <Header/>
          <div style = {styleTableDiv}>
            <Row>
              <Col>
                <center><h2>Edit Blog</h2></center>
              </Col>
            </Row>
            <div style = {{padding: '5px'}}>
              <center><h4>Something went wrong! Please try again..</h4></center>
            </div>
          </div>
          <Footer/>
        </Container>
      )
    }
    else if(this.state.responseFetched === 1){
      return(
        <Container>
          <Header/>
          <div style = {styleTableDiv}>
            <Row>
              <Col>
                <center><h2>Edit Blog</h2></center>
              </Col>
            </Row>
            <div style = {{padding: '5px'}}>
              <Form>
                <Row>
                  <Col xs={12} md={3}>
                    <img
                      className="w-100"
                      src={process.env.PUBLIC_URL + "images/blogs/" + this.state.blogImg}
                      alt="image"
                    />
                  </Col>
                  <Col xs={12} md={9}>
                    <Row style ={{padding: "1rem 1.5rem"}}>
                      <Form.Control type = "file" id = "blog-image" required></Form.Control>
                    </Row>

                    <Row style = {{padding: "1rem"}}>
                      <Col md={6} style={{padding: "0.5rem 0.5rem"}}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type = "text" id = "blog-title" placeholder = "Title" value={this.state.title} onChange={this.changeTitle.bind(this)} required></Form.Control>
                      </Col>
                      <Col md={6} style={{padding: "0.5rem 0.5rem"}}>
                        <Form.Label>Posted By</Form.Label>
                        <Form.Control type = "text" id  = "blog-posted-by" placeholder = "Posted by" value={this.state.postedBy} onChange={this.changePostedBy.bind(this)} required></Form.Control>
                      </Col>
                    </Row>

                    <Row style ={{padding: "1rem 1.5rem"}}>
                      <Form.Label>Content</Form.Label>
                      <Form.Control as = "textarea" rows = "5" id = "blog-description" placeholder = "Description" value={this.state.description} onChange={this.changeDescription.bind(this)}></Form.Control>
                    </Row>

                    <Row style = {{padding: "1rem", margin: "0"}}>
                      <Button variant = "primary" onClick = {this.updateBlog.bind(this)}>Submit</Button>
                    </Row>

                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          <Footer/>
          <Sweetalert type={this.state.ModeratorAlertStyle} confirmBtnText={this.state.ModeratorAlertConfirmButton} confirmBtnBsStyle="primary" title="Moderator Utility" show={this.state.ModeratorAlertShow} onConfirm={this.handleModeratorAlertClose}>
              {this.state.ModeratorAlertText}
          </Sweetalert>
        </Container>
      )
    }
  }
}
export default BlogEditPane;
