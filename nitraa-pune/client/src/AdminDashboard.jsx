import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';
import Sweetalert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';

class AdminDashboard extends React.Component{

    constructor(props){
        super(props);
        
    }

    render(){
        
        return(
            <Container>
                <Header/>
                
                <Footer/>
            </Container>
        )
    }
}

export default AdminDashboard;