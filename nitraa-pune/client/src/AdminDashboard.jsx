import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MaterialIcons from 'material-icons-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Sweetalert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';

class AdminDashboard extends React.Component{

    constructor(props){
        super(props);
        
    }

    render(){

        const styleTable = {
            paddingTop : '15vh'
        }
        
        return(
            <Container>
                <Header/>
                <div style={styleTable}>
                    <Table responsive bordered striped variant="light">
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th><Button variant="link"><MaterialIcons icon="add_circle" /></Button></th>
                        </tr>
                    </Table>
                </div>
                <Footer/>
            </Container>
        )
    }
}

export default AdminDashboard;