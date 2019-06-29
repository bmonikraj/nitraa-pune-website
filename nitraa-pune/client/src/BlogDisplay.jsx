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
import queryString from 'query-string';
import $ from 'jquery';

class BlogDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          id: "",
          title: "",
          description: "",
          postedBy: "",
          blogImg: "",
          postedDate: "",
          responseFetched: 0,
          comments: [],
          commentLine: "",
          profile: "",
          AlertShow: false,
          AlertText: "",
          AlertTitle: "",
          AlertStyle: "danger",
          AlertConfirmButton: "I Understand",
          DeleteConfirmShow: false
        }
        this.handleAlertShow=this.handleAlertShow.bind(this);
    }
    handleAlertShow(){
      this.setState({
        AlertShow: true
      });
    }
    componentDidMount(){
      var params = queryString.parse(this.props.location.search);
      if(params.bid){
        this.setState({
          id: params.bid
        });
      }

      if(localStorage.getItem("authtoken")){
        this.setState({
          profile: localStorage.getItem("profile")
        });

      }
      else{
        this.setState({
          profile: ""
        });
      }

      let _self = this;
      axios({
        method: 'GET',
        url: '/blogs/'+ params.bid,
      }).then((response) => {
        console.log(response);
        if(response.data.status === "success"){
          _self.setState({
            title: response.data.data.blogTitle,
            description: response.data.data.blogDescription,
            postedBy: response.data.data.blogPostedby,
            postedDate: response.data.data.blogPostedDate,
            blogImg: params.bid + "." + response.data.data.blog_image_ext,
            comments: response.data.data.comments,
            responseFetched: 1
          });
        }
        else{
          _self.setState({
            responseFetched: 300
          });
        }
      }).catch((error) => {
        _self.setState({
          responseFetched: 300
        });
        console.log(error);
      });
    }
    postComment(){
      let commentPost = $("#comment-box").val();
      if(this.state.profile === "user"){
        if(commentPost === ""){
          this.setState({
            AlertText: "Comment box empty!",
            AlertStyle: "danger",
            AlertTitle: "Post Comments",
            AlertConfirmButton: "I Understand"
          });
          this.handleAlertShow();
        }
        else{
          var _self = this;
          axios({
            method: "POST",
            url: "/blogs/comments",
            data: {
              blogId: this.state.id,
              commentLine: commentPost
            },
            headers: {
              authtoken: localStorage.getItem("authtoken")
            }
          }).then(response =>{
            console.log(response.data);
            if(response.data.status === "success"){
              _self.setState({
                AlertText: "Successfully Posted",
                AlertStyle: "success",
                AlertTitle: "Post Comments",
                AlertConfirmButton: "OK",
                commentLine: "",
                comments: response.data.data
              });
              _self.handleAlertShow();
            }
            else{
              _self.setState({
                AlertText: "Something Went Wrong",
                AlertStyle: "danger",
                AlertTitle: "Post Comments",
                AlertConfirmButton: "I Understand"
              });
              _self.handleAlertShow();
            }
          }).catch(error => {
            _self.setState({
              AlertText: "An Unexpected Error Occured",
              AlertStyle: "danger",
              AlertTitle: "Post Comments",
              AlertConfirmButton: "I Understand"
            });
            _self.handleAlertShow();
          })
        }
      }
      else{
        this.setState({
          AlertText: "Not Authorized!",
          AlertStyle: "danger",
          AlertTitle: "Post Comments",
          AlertConfirmButton: "I Understand"
        });
        this.handleAlertShow();
      }
    }
    changeCommentLine(event){
      console.log(event.target.value);
      this.setState({
        commentLine: event.target.value
      });
    }
    deleteBlog(){
      this.setState({
        DeleteConfirmShow: true
      });
    }
    deleteRecord(blogId){
      this.setState({
        DeleteConfirmShow: false
      });
      if(localStorage.getItem('authtoken') && localStorage.getItem('profile') === 'moderator'){
        var _self = this;
        console.log(blogId);
        axios({
          method: "DELETE",
          url: "/blogs",
          data: {
            id: blogId
          },
          headers: {
            authtoken: localStorage.getItem('authtoken')
          }
        }).then(response => {
          if(response.data.status === "success"){
            _self.setState({
              AlertText: "Blog Deleted Successfully",
              AlertStyle: "success",
              AlertTitle: "Blog Details",
              AlertConfirmButton: "OK"
            });
            _self.handleAlertShow();
          }
          else{
            _self.setState({
              AlertText: response.data.message,
              AlertStyle: "danger",
              AlertTitle: "Blog Details",
              AlertConfirmButton: "I Understand"
            });
            _self.handleAlertShow();
          }
        }).catch(error =>{
          _self.setState({
            AlertText: "An Unexpected Error Occured",
            AlertStyle: "danger",
            AlertTitle: "Blog Details",
            AlertConfirmButton: "I Understand"
          });
          _self.handleAlertShow();
        });
      }
      else{
        _self.setState({
          AlertText: "Not authorized to perform this action",
          AlertStyle: "danger",
          AlertTitle: "Blog Details",
          AlertConfirmButton: "I Understand"
        });
        _self.handleAlertShow();
      }
    }
    cancelDelete(){
      this.setState({
        DeleteConfirmShow: false
      });
    }
    handleAlertClose(){
      this.setState({
        AlertShow: false
      });
      if(this.state.AlertStyle === "success" && this.state.AlertTitle === "Blog Details"){
        window.open("/blogs-list", "_self");
      }
    }
    render() {

      const styleTableDiv = {
          marginTop : '15vh',
          marginBottom : '15vh',
          background : "#eeeeee",
          padding: "10px"
      }
      if(this.state.responseFetched === 0){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                    <center><h4>Loading...</h4></center>
                  </div>
                <Footer />
            </Container>
        )
      }
      else if(this.state.responseFetched === 300){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                    <center><h4>Something went wrong! Please try again later..</h4></center>
                  </div>
                <Footer />
            </Container>
        )
      }
      else if(this.state.responseFetched === 1){
        let elem;
        if(this.state.profile === "moderator"){
          elem = (
            <Row>
              <Col xs={12} md={7}></Col>
              <Col xs={12} md={2} style={{padding: "0.2rem 1rem"}}>
                <a href={"/blog-edit-pane?bid="+this.state.id} style={{textDecoration: "none"}}>
                  <Button variant="outline-info" block>
                    Edit
                  </Button>
                </a>
              </Col>
              <Col xs={12} md={2} style={{padding: "0.2rem 1rem"}}>
                <Button variant="outline-success" onClick={this.deleteBlog.bind(this)} block>
                  Delete
                </Button>
              </Col>
            </Row>
          );
        }
        else if(this.state.profile === "user" || this.state.profile === ""){
          elem = (
            <Row>
              <Col xs={12} md={9}></Col>
              <Col xs={12} md={2} style={{padding: "0.2rem 1rem"}}>
                <a href="/blogs-list" style={{textDecoration: "none"}}>
                  <Button variant="outline-info" block>
                    Go Back
                  </Button>
                </a>
              </Col>
            </Row>
          );
        }
        let elem2;
        if(this.state.comments.length === 0){
          elem2 = (
            <Container style={{backgroundColor: "#f7f7f7", paddingTop: "0.5rem", paddingBottom: "1rem"}}>
              <Container style={{padding: "0.5rem"}}>
                <center><b style={{fontSize: "0.9rem", color: "#333"}}>No Comments Yet.</b></center>
              </Container>
            </Container>
          );
        }
        else{
          elem2 = (
            <Container style={{backgroundColor: "#f7f7f7", paddingTop: "0.5rem"}}>
              <Container style={{padding: "0.5rem"}}>
                <b style={{fontSize: "0.9rem", color: "#333"}}>All Comments</b>
              </Container>
              <div style={{padding: "1rem 0"}}>
                {this.state.comments.map(item => {
                  return (
                    <Container style={{maxWidth: "600px", backgroundColor: "white", marginLeft: "0", marginBottom: "1rem"}}>
                      <Row>
                        <Col xs={12} style={{fontSize: "0.8rem", marginBottom: "0.5rem"}}><b>{item.display_name}</b></Col>
                        <Col xs={12} style={{fontSize: "0.7rem", marginBottom: "0.5rem"}}>
                          {item.commentLine}
                        </Col>
                        <Col xs={12} style={{fontSize: "0.7rem", color: "grey"}}>{item.time}</Col>
                      </Row>
                    </Container>
                  )
                })}
              </div>
            </Container>
          );
        }
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                      <Row>
                        <Col style={{color: "#444"}}>
                          <center><h3><b>{this.state.title}</b></h3></center>
                        </Col>
                      </Row>
                      <hr/>
                      <Row>
                        <Col xs={6} md={8}></Col>
                        <Col xs={6} md={4} style={{fontSize: "0.75rem", color: "grey"}}>
                          <center><b>By:</b> {this.state.postedBy}</center>
                          <center><b>{this.state.postedDate}</b></center>
                        </Col>
                      </Row>
                      {elem}
                      <Row style ={{padding: "0.5rem", margin: "0"}}>
                         <Col xs={12}>
                           <img className="w-100" src={process.env.PUBLIC_URL + "images/blogs/" + this.state.blogImg} />
                         </Col>
                        <Col xs={12} style={{marginTop: "1rem"}}>
                          <p style={{textAlign: "justify", fontSize: "0.85rem", color: "#555"}}>{this.state.description}</p>
                        </Col>
                        <Col xs={12} style={{marginTop: "3rem", padding: "0 0.5rem"}}>
                          <Container fluid={true} style={{backgroundColor: "#f7f7f7",paddingTop: "1.5rem", borderRadius: "3px 3px 0 0"}}>
                            <Row>
                              <Col xs={12} md={10}>
                                <Form>
                                  <Form.Group controlId="formBasicComment">
                                      {(this.state.profile === "user")?<Form.Control as="textarea" id="comment-box" type="text" value={this.state.commentLine} onChange={this.changeCommentLine.bind(this)} placeholder="Post your comments here"/>:<Form.Control as="textarea" type="text" placeholder="Sign In as an User to post comments" disabled/>}
                                  </Form.Group>
                                </Form>
                              </Col>
                              <Col xs={12} md={2}>
                                {(this.state.profile === "user")?<Button variant="outline-info" onClick={this.postComment.bind(this)}>Post Comment</Button>:<Button variant="outline-info" disabled>Post Comment</Button>}
                              </Col>
                            </Row>
                          </Container>
                          {elem2}
                        </Col>
                      </Row>
                  </div>
                <Footer />
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.deleteRecord.bind(this, this.state.id)}
                    onCancel={this.cancelDelete.bind(this)}
                    show={this.state.DeleteConfirmShow}
                >
                    You will not be able to recover.
                </SweetAlert>
                <SweetAlert
                    confirmBtnText={this.state.AlertConfirmButton}
                    title={this.state.AlertTitle}
                    type={this.state.AlertStyle}
                    onConfirm={this.handleAlertClose.bind(this)}
                    show={this.state.AlertShow}
                >
                    {this.state.AlertText}
                </SweetAlert>
            </Container>
        )
      }
    }
}

export default BlogDisplay;
