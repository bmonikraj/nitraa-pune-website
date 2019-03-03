import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import MediaQuery from 'react-responsive';
import ImageResizable from 'react-image-resizer';
import GalleryGrid from 'react-photo-gallery';
import Lightbox from 'react-images';
import Header from './Components/Header';
import Footer from './Components/Footer';

class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentImage: 0, photos : [] };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }

    componentDidMount(){
        this.setState({
            photos : [
                { src: process.env.PUBLIC_URL + 'images/3.jpg', width : 1, height : 1, caption: 'Photo by Me' },
                { src: process.env.PUBLIC_URL + 'images/2.jpg', width : 1, height : 1 },
                { src: process.env.PUBLIC_URL + 'images/1.jpg', width : 1, height : 1 },
                { src: process.env.PUBLIC_URL + 'images/3.jpg', width : 1, height : 1 },
                { src: process.env.PUBLIC_URL + 'images/2.jpg', width : 1, height : 1 },
                { src: process.env.PUBLIC_URL + 'images/1.jpg', width : 1, height : 1 }
            ]
        });
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
        const non_mobile_dim = {
            height: window.innerHeight * 0.74,
            width: window.innerWidth * 0.85
        }
        const mobile_dim = {
            height: window.innerHeight * 1,
            width: window.innerWidth * 0.5
        }
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

export default Gallery;