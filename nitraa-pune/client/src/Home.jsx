import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Header from './Components/Header';
import Footer from './Components/Footer';

class Home extends React.Component{
    render(){
        return(
            <Container>
                <Header/>
                <Footer/>
            </Container>
        )
    }
}

export default Home;