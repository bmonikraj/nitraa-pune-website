import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MediaQuery from 'react-responsive';
import ImageResizable from 'react-image-resizer';
import GalleryGrid from 'react-photo-gallery';
import Lightbox from 'react-images';
import Header from './Components/Header';
import Footer from './Components/Footer';
import axios from 'axios';

class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentImage: 0, photos : [], responseFetched: 0, lightboxIsOpen: false };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem('authtoken')){
          var _self = this;
          axios({
              method : "get",
              url : "/moderator-gallery",
          })
          .then(function(response){
              if(response.data.status === 'success'){
                  var p = [];
                  for(var i=0; i<response.data.list.length; i++){
                    p.push({src : process.env.PUBLIC_URL + 'images/gallery/'+response.data.list[i]._id + '.' + response.data.list[i].EXT, width : 1, height : 1, caption : response.data.list[i].caption});
                    if(i===response.data.list.length-1){
                        _self.setState({photos : p});
                    }
                  }
                  _self.setState({responseFetched: 1});
              }
              else{
                  _self.setState({responseFetched: 300});
              }
          })
          .catch(function(err){
              _self.setState({responseFetched: 300});
          })
        }
        else{
          this.setState({
            responseFetched: 404
          })
        }

        // this.setState({
        //     photos : [
        //         { src: process.env.PUBLIC_URL + 'images/3.jpg', width : 1, height : 1, caption: 'Photo by Me' },
        //         { src: process.env.PUBLIC_URL + 'images/2.jpg', width : 1, height : 1 },
        //         { src: process.env.PUBLIC_URL + 'images/1.jpg', width : 1, height : 1 },
        //         { src: process.env.PUBLIC_URL + 'images/3.jpg', width : 1, height : 1 },
        //         { src: process.env.PUBLIC_URL + 'images/2.jpg', width : 1, height : 1 },
        //         { src: process.env.PUBLIC_URL + 'images/1.jpg', width : 1, height : 1 }
        //     ]
        // });
    }

    openLightbox(event, obj) {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true,
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    render() {
        var styleTableDiv = {
            marginTop : '15vh',
            marginBottom : '15vh',
            background : "#eeeeee",
            padding: "10px"
        }
        const non_mobile_dim = {
            height: window.innerHeight * 0.74,
            width: window.innerWidth * 0.85
        }
        const mobile_dim = {
            height: window.innerHeight * 1,
            width: window.innerWidth * 0.5
        }
        if(this.state.responseFetched === 0){
          return (
              <Container>
                  <Header />
                    <div style = {styleTableDiv}>
                        <Row style ={{padding: "1rem", margin: "0"}}>
                          <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                            <center><h5>Loading ...</h5></center>
                          </Col>
                        </Row>
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
                        <Row style ={{padding: "1rem", margin: "0"}}>
                          <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                            <center><h5>Something went wrong. Please try again later..</h5></center>
                          </Col>
                        </Row>
                    </div>
                  <Footer />
              </Container>
          )
        }
        else if(this.state.responseFetched === 404){
          return (
              <Container>
                  <Header />
                    <div style = {styleTableDiv}>
                        <Row style ={{padding: "1rem", margin: "0"}}>
                          <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                            <center><h5>Sorry! Not authorized to view this page..</h5></center>
                          </Col>
                        </Row>
                    </div>
                  <Footer />
              </Container>
          )
        }
        else if(this.state.responseFetched === 1){
          if(this.state.photos.length === 0){
            return (
                <Container>
                    <Header />
                      <div style = {styleTableDiv}>
                          <Row style ={{padding: "1rem", margin: "0"}}>
                            <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                              <center><h5>No Photos..</h5></center>
                            </Col>
                          </Row>
                      </div>
                    <Footer />
                </Container>
            )
          }
          else{
            return (
                <Container>
                    <Header />
                    <GalleryGrid photos={this.state.photos} onClick={this.openLightbox} />
                    <Lightbox
                        images={this.state.photos}
                        onClose={this.closeLightbox}
                        onClickPrev={this.gotoPrevious}
                        onClickNext={this.gotoNext}
                        currentImage={this.state.currentImage}
                        isOpen={this.state.lightboxIsOpen}
                    />
                    <Footer />
                </Container>
            )
          }
        }

    }
}

export default Gallery;
