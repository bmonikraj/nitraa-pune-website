import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Header from './Components/Header';
import Footer from './Components/Footer';

const app = document.getElementById("root");

ReactDOM.render(
    <Container>
        <Header/>
        <Footer/>
    </Container>
,app);