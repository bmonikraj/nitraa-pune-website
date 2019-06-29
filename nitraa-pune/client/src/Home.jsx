import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import MediaQuery from 'react-responsive';
import ImageResizable from 'react-image-resizer';
import Header from './Components/Header';
import Footer from './Components/Footer';

class Home extends React.Component {
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
                <MediaQuery query="(min-device-width : 768px)">
                    <Carousel controls={false} indicators={false} interval={2000} style={{ paddingTop: window.innerHeight*0.15 }}>
                        <Carousel.Item>
                            <ImageResizable
                                src={process.env.PUBLIC_URL + 'images/carousel/1.jpg'}
                                alt="First slide"
                                height={non_mobile_dim.height}
                                width={non_mobile_dim.width}
                                style={{ background: "#ffffff" }}
                            />
                            {/*<Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>*/}
                        </Carousel.Item>
                        <Carousel.Item>
                            <ImageResizable
                                src={process.env.PUBLIC_URL + 'images/carousel/2.jpg'}
                                alt="First slide"
                                height={non_mobile_dim.height}
                                width={non_mobile_dim.width}
                                style={{ background: "#ffffff" }}
                            />

                            {/*<Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>*/}
                        </Carousel.Item>
                        <Carousel.Item>
                            <ImageResizable
                                src={process.env.PUBLIC_URL + 'images/carousel/3.jpg'}
                                alt="First slide"
                                height={non_mobile_dim.height}
                                width={non_mobile_dim.width}
                                style={{ background: "#ffffff" }}
                            />

                            {/*<Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>*/}
                        </Carousel.Item>
                        <Carousel.Item>
                            <ImageResizable
                                src={process.env.PUBLIC_URL + 'images/carousel/4.jpg'}
                                alt="First slide"
                                height={non_mobile_dim.height}
                                width={non_mobile_dim.width}
                                style={{ background: "#ffffff" }}
                            />

                            {/*<Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>*/}
                        </Carousel.Item>
                        <Carousel.Item>
                            <ImageResizable
                                src={process.env.PUBLIC_URL + 'images/carousel/5.jpg'}
                                alt="First slide"
                                height={non_mobile_dim.height}
                                width={non_mobile_dim.width}
                                style={{ background: "#ffffff" }}
                            />

                            {/*<Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>*/}
                        </Carousel.Item>
                    </Carousel>
                </MediaQuery>
                <MediaQuery query="(max-device-width : 768px)">
                    <Carousel controls={false} indicators={false} interval={2000} style={{ paddingTop: window.innerHeight*0.15 }}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={process.env.PUBLIC_URL + 'images/carousel/1.jpg'}
                                alt="First slide"
                            />
                            {/*<Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>*/}
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={process.env.PUBLIC_URL + 'images/carousel/2.jpg'}
                                alt="Third slide"
                            />

                            {/*<Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>*/}
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={process.env.PUBLIC_URL + 'images/carousel/3.jpg'}
                                alt="Third slide"
                            />

                            {/*<Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>*/}
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={process.env.PUBLIC_URL + 'images/carousel/4.jpg'}
                                alt="First slide"
                            />
                            {/*<Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>*/}
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={process.env.PUBLIC_URL + 'images/carousel/5.jpg'}
                                alt="First slide"
                            />
                            {/*<Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>*/}
                        </Carousel.Item>
                    </Carousel>
                </MediaQuery>
                <Footer />
            </Container>
        )
    }
}

export default Home;
