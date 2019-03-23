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
                                            <Col  md={2}>
                                                <Form.Label id="gallery-filename" style={{border:"solid 1px blue"}}></Form.Label>
                                            </Col>
                                            <Col md={7}>
                                                <Form.Control type="text" id="gallery-caption" placeholder="Caption" required></Form.Control>
                                            </Col>
                                            <Col  md={1}>
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