import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MaterialIcons from 'material-icons-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import Sweetalert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import $ from 'jquery';
import * as d3 from 'd3';
// import IMGSlider from 'react-image-slider';
// import '../node_modules/react-image-slider/lib/image-slider.css';

class ModeratorDashboard extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            ModeratorAlertText : "",
            ModeratorAlertShow : false,
            ModeratorAlertStyle : "danger",
            galleryImages : [],
            r : 10
        }

        this.handleModeratorAlertClose = this.handleModeratorAlertClose.bind(this);
        this.handleModeratorAlertShow = this.handleModeratorAlertShow.bind(this);
        this.handleDeleteGallery = this.handleDeleteGallery.bind(this);
    }

    handleModeratorAlertShow() {
        this.setState({ ModeratorAlertShow: true });
    }

    handleModeratorAlertClose() {
        this.setState({ ModeratorAlertShow: false });
        $("#gallery-caption").val("");
    }

    handleDeleteGallery(e){
        var _self = this;
        var event = e;
        console.log();
        axios({
            method : "delete",
            url : "/moderator-gallery",
            headers : {
                authtoken:localStorage.getItem('authtoken')
            },
            data : {
                dbid : $($(event.currentTarget)[0]).attr('value')
            }
        })
        .then(function(response){
            if(response.data.status == 'success'){
                _self.setState({ModeratorAlertText : "Successfully Deleted", ModeratorAlertStyle : "success"});
                _self.handleModeratorAlertShow();
                _self.fetchGallery();
            }
            else{
                _self.setState({ModeratorAlertText : response.data.message, ModeratorAlertStyle : "danger"});
                _self.handleModeratorAlertShow();
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }

    fetchGallery(){
        var _self = this;
        axios({
            method : "get",
            url : "/moderator-gallery",
            headers : {
                authtoken:localStorage.getItem('authtoken')
            }
        })
        .then(function(response){
            if(response.data.status === 'success'){
                console.log(response.data.list);
                if(response.data.list.length === 0){
                    _self.setState({ModeratorAlertText : "No Gallery Images", ModeratorAlertStyle : "danger"});
                    _self.handleModeratorAlertShow();
                }
                else{
                    _self.setState({galleryImages : response.data.list});
                }
            }
            else{
                _self.setState({ModeratorAlertText : response.data.message, ModeratorAlertStyle : "danger"});
                _self.handleModeratorAlertShow();
            }
        })
        .catch(function(err){
            console.log(err);
        })
    }

    componentDidMount(){
        $("#gallery-file").on("change", function(e){
            $("#gallery-filename").html(e.currentTarget.files[0].name)
        })

        this.fetchGallery();

        var _self = this;

        $("#gallery-upload").on("click", function(e){
            if($("#gallery-caption").val() == '' || $("#gallery-file")[0].files.length === 0){
                _self.setState({ModeratorAlertText : "Empty Fields are not acceptable", ModeratorAlertStyle : "danger"});
                _self.handleModeratorAlertShow();
            }
            else{
                const formdata = new FormData()
                formdata.append("galleryImage", $("#gallery-file")[0].files[0])
                formdata.append("caption", $("#gallery-caption").val())
                axios({
                    method : "post",
                    url : "/moderator-gallery",
                    headers : {
                        authtoken:localStorage.getItem('authtoken'),
                        'Content-Type': 'multipart/form-data'
                    },
                    data : formdata
                })
                .then(function(response){
                    if(response.data.status === "success"){
                        _self.setState({ModeratorAlertText : "Successfully Uploaded", ModeratorAlertStyle : "success"});
                        _self.handleModeratorAlertShow();
                        _self.fetchGallery();
                    }
                    else{
                        _self.setState({ModeratorAlertText : response.data.message, ModeratorAlertStyle : "danger"});
                        _self.handleModeratorAlertShow();
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        })


    }

    addEvent(){
      let eventName = $("#event-name").val();
      let eventDate = $("#event-date").val();
      let eventTime = $("#event-time").val();
      let eventLocation = $("#event-location").val();
      let eventDescription = $("#event-description").val();
      let eventExtLinks = $("#event-external-links").val();
      let eventRegFees = $("#event-registration-fees").val();
      let eventCreatedby = $("#event-created-by").val();
      let eventOnBehalfof = $("#event-on-behalf-of").val();
      console.log($("#event-image")[0].files[0]);
      if(eventName=="" || eventDate=="" || eventTime=="" || eventLocation=="" || eventDescription=="" || eventExtLinks=="" || eventRegFees=="" || eventCreatedby=="" || eventOnBehalfof==""){
        this.setState({ModeratorAlertText : "One or more field(s) empty.", ModeratorAlertStyle : "danger"});
        this.handleModeratorAlertShow();
      }
      else{
        var formdata = new FormData();
        formdata.append("ImageFile", $("#event-image")[0].files[0]);
        formdata.append("eventName",eventName);
        formdata.append("eventDate",eventDate);
        formdata.append("eventTime",eventTime);
        formdata.append("eventLocation",eventLocation);
        formdata.append("eventDescription",eventDescription);
        formdata.append("eventExtLinks",eventExtLinks);
        formdata.append("eventRegFees",eventRegFees);
        formdata.append("eventCreatedby",eventCreatedby);
        formdata.append("eventOnBehalfof",eventOnBehalfof);

        var _self = this;
        axios({
          method: "POST",
          url: '/events',
          headers: {
            authtoken: localStorage.getItem('authtoken'),
            'Content-Type': 'multipart/form-data'
          },
          data: formdata
        }).then((response) => {
          console.log(response);
          if(response.data.status === "success"){
            _self.setState({ModeratorAlertText : "Event details added successfully", ModeratorAlertStyle : "success"});
            _self.handleModeratorAlertShow();
            window.open("/moderator-dashboard", "_self");
          }
          else{
            _self.setState({ModeratorAlertText : response.data.message, ModeratorAlertStyle : "danger"});
            _self.handleModeratorAlertShow();
          }
        }).catch((error) => {
          console.log(error);
        })
      }
    }

    addBlog(){
      let blogTitle = $("#blog-title").val();
      let blogPostedby = $("#blog-posted-by").val();
      let blogDescription = $("#blog-description").val();
      if(blogTitle=="" || blogDescription=="" || blogPostedby=="" || !($("#blog-image")[0].files)){
        this.setState({ModeratorAlertText : "One or more field(s) empty.", ModeratorAlertStyle : "danger"});
        this.handleModeratorAlertShow();
      }
      else{
        var formdata = new FormData();
        formdata.append("ImageFile", $("#blog-image")[0].files[0]);
        formdata.append("blogTitle",blogTitle);
        formdata.append("blogDescription",blogDescription);
        formdata.append("blogPostedby",blogPostedby);

        var _self = this;
        axios({
          method: "POST",
          url: '/blogs',
          headers: {
            authtoken: localStorage.getItem('authtoken'),
            'Content-Type': 'multipart/form-data'
          },
          data: formdata
        }).then((response) => {
          console.log(response);
          if(response.data.status === "success"){
            _self.setState({ModeratorAlertText : "Blog added successfully", ModeratorAlertStyle : "success"});
            _self.handleModeratorAlertShow();
            window.open("/moderator-dashboard", "_self");
          }
          else{
            _self.setState({ModeratorAlertText : response.data.message, ModeratorAlertStyle : "danger"});
            _self.handleModeratorAlertShow();
          }
        }).catch((error) => {
          console.log(error);
        })
      }
    }
    render(){

        const styleTableDiv = {
            marginTop : '15vh',
            marginBottom : '15vh',
            background : "#eeeeee"
        }

        return(
            <Container>
                <Header/>
                    <div style={styleTableDiv}>
                        <Tabs defaultActiveKey="gallery">
                            <Tab eventKey="gallery" title="GALLERY">
                                <div style={{padding:"2vw"}}>
                                    <Form>
                                        <Row>
                                            <Col md={2}>
                                                <Form.Control type="file" id="gallery-file"></Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Label id="gallery-filename" style={{border:"solid 1px blue"}}></Form.Label>
                                            </Col>
                                            <Col md={7}>
                                                <Form.Control type="text" id="gallery-caption" placeholder="Caption" required></Form.Control>
                                            </Col>
                                            <Col md={1}>
                                                <Button variant="primary" id="gallery-upload">
                                                    Upload
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                    <hr/>
                                    <div style={{overflowX:"auto", overflowY:"hidden", display:"inline-block", whiteSpace:"nowrap", width:"100%"}}>
                                        {this.state.galleryImages.map((d,i) => {
                                            return (
                                                <React.Fragment>
                                                    <div style={{display:"inline-block"}}>
                                                    <Button value={d._id} variant="outline-warning" onClick={this.handleDeleteGallery}>Delete</Button>
                                                    <img src={process.env.PUBLIC_URL + 'images/gallery/'+d._id + '.' + d.EXT} height="100vw" width="100vw" style={{marginRight:"15px"}}/>
                                                    </div>
                                                {/* <p><b>X</b></p> */}
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Tab>
                            {/* If Something new comes up for Moderator- Carousel to be done by the Developer */}
                            <Tab eventKey = "event" title = "EVENT">
                                <div style={{padding:"2vw"}}>
                                    <Form>
                                        <Row style ={{padding: "1rem"}}>
                                          <Col md={3} style={{padding: "0.5rem 0.5rem"}}>
                                            <Form.Control type="text" id="event-name" placeholder = "Name" required></Form.Control>
                                          </Col>
                                          <Col md={3} style={{padding: "0.5rem 0.5rem"}}>
                                            <Form.Control type="date" id = "event-date" placeholder = "Date" required></Form.Control>
                                          </Col>
                                          <Col md={3} style={{padding: "0.5rem 0.5rem"}}>
                                            <Form.Control type = "time" id = "event-time" placeholder = "hrs:mins" required></Form.Control>
                                          </Col>
                                          <Col md={3} style={{padding: "0.5rem 0.5rem"}}>
                                            <Form.Control type = "text" id = "event-location" placeholder = "Location" required></Form.Control>
                                          </Col>
                                        </Row>

                                        <Row style ={{padding: "1rem 1.5rem"}}>
                                            <Form.Control as = "textarea" rows = "3" type ="text" id = "event-description" placeholder = "Description" required></Form.Control>
                                        </Row>

                                        <Row style ={{padding: "1rem"}}>
                                          <Col md={6} style={{padding: "0.5rem 0.5rem"}}>
                                            <Form.Control type = "text" id = "event-external-links" placeholder = "External Links" required></Form.Control>
                                          </Col>

                                          <Col md={6} style={{padding: "0.5rem 0.5rem"}}>
                                            <Form.Control type = "text" id = "event-registration-fees" placeholder = "Registration Fees"></Form.Control>
                                          </Col>
                                        </Row>

                                        <Row style ={{padding: "1rem"}}>
                                          <Col md={4} style={{padding: "0.5rem 0.5rem"}}>
                                            <Form.Control type = "text" id = "event-created-by" placeholder = "Organized By" required></Form.Control>
                                          </Col>

                                          <Col md={4} style={{padding: "0.5rem 0.5rem"}}>
                                            <Form.Control type = "text" id = "event-on-behalf-of" placeholder = "On Behalf of" required></Form.Control>
                                          </Col>

                                          <Col md={4} style={{padding: "0.5rem 0.5rem"}}>
                                            <Form.Control type = "file" id = "event-image" required></Form.Control>
                                          </Col>
                                        </Row>

                                        <Row style = {{padding: "1rem", margin: "0"}}>
                                          <Button variant = "primary" onClick = {this.addEvent.bind(this)}>Submit</Button>
                                        </Row>
                                    </Form>
                                </div>
                                <hr/>
                            </Tab>
                            <Tab eventKey = "blog" title = "BLOG">
                                <div style={{padding:"2vw"}}>
                                  <Row style ={{padding: "1rem 1.5rem"}}>
                                    <Form.Control type = "file" id = "blog-image" required></Form.Control>
                                  </Row>

                                  <Row style = {{padding: "1rem"}}>
                                    <Col md={6} style={{padding: "0.5rem 0.5rem"}}>
                                      <Form.Control type = "text" id = "blog-title" placeholder = "Title" required></Form.Control>
                                    </Col>
                                    <Col md={6} style={{padding: "0.5rem 0.5rem"}}>
                                      <Form.Control type = "text" id  = "blog-posted-by" placeholder = "Posted by" required></Form.Control>
                                    </Col>
                                  </Row>

                                  <Row style ={{padding: "1rem 1.5rem"}}>
                                    <Form.Control as = "textarea" rows = "5" id = "blog-description" placeholder = "Description"></Form.Control>
                                  </Row>

                                  <Row style = {{padding: "1rem", margin: "0"}}>
                                    <Button variant = "primary" onClick = {this.addBlog.bind(this)}>Submit</Button>
                                  </Row>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                <Footer/>
                <Sweetalert type={this.state.ModeratorAlertStyle} confirmBtnText="I Understand" confirmBtnBsStyle="primary" title="Moderator Utility" show={this.state.ModeratorAlertShow} onConfirm={this.handleModeratorAlertClose}>
                    {this.state.ModeratorAlertText}
                </Sweetalert>
            </Container>

        )
    }
}

export default ModeratorDashboard;
