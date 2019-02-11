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
        this.handleLoginAlertOpen = this.handleLoginAlertOpen.bind(this);
        this.handleLoginAlertClose = this.handleLoginAlertClose.bind(this);
        this.fetchRow = this.fetchRow.bind(this);
        this.clearAddInput = this.clearAddInput.bind(this);
        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.state = {
            table_data : [],
            loginAlertShow : false,
            loginAlertText : ""
        }        
    }

    handleLoginAlertOpen(){
        this.setState({loginAlertShow : true});
    }

    handleLoginAlertClose(){
        this.setState({loginAlertShow : false});
    }

    componentDidMount(){
        this.fetchRow();
    }

    fetchRow(){
        var _self = this;
        axios({
            url : '/admin-moderator-crud',
            method : 'get',
            headers : {
                authtoken:localStorage.getItem('authtoken')
            }
        })
        .then(function(response){
            console.log(response);
            if(response.data.status == 'success'){
                _self.setState({table_data : response.data.list});
            }
            else{
                _self.setState({loginAlertText : response.data.message});
                _self.handleLoginAlertOpen();
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }

    addRow(){
        var _self = this;
        axios({
            url : '/admin-moderator-crud',
            method : 'post',
            headers : {
                authtoken:localStorage.getItem('authtoken')
            },
            data : {
                username : _self.usernameInput.value,
                password : _self.passwordInput.value
            }
        })
        .then(function(response){
            console.log(response);
            if(response.data.status == 'success'){
                var new_array = _self.state.table_data;
                new_array.push({username : _self.usernameInput.value, password : _self.passwordInput.value});
                _self.setState({table_data : new_array});
                _self.clearAddInput();
            }
            else{
                _self.setState({loginAlertText : response.data.message});
                _self.handleLoginAlertOpen();
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }

    removeRow(){
        var _self = this;
        axios({
            url : '/admin-moderator-crud',
            method : 'delete',
            headers : {
                authtoken:localStorage.getItem('authtoken')
            },
            data : {
                username : "dummy",
            }
        })
        .then(function(response){
            console.log(response);
            if(response.data.status == 'success'){
                var new_array = _self.state.table_data;
                new_array.filter(function(v,i,a){
                    return v.username == "dummy";
                });
                _self.setState({table_data : new_array})
            }
            else{
                _self.setState({loginAlertText : response.data.message});
                _self.handleLoginAlertOpen();
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }

    clearAddInput(){
        this.usernameInput.value = "";
        this.passwordInput.value = "";
    }

    render(){

        const styleTableDiv = {
            paddingTop : '15vh',
            paddingBottom : '15vh'
        }
        const styleTable = {
            background : "#eeeeee"
        }
        
        return(
            <Container>
                <Header/>
                <div style={styleTableDiv}>
                    <Table style={styleTable} responsive bordered striped variant="light">
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th><Button variant="link" onClick={this.addRow}><MaterialIcons icon="add_circle" /></Button></th>
                        </tr>
                        <tr>
                            <td>Input</td>
                            <td><Form.Group controlId="formBasicText"><Form.Control placeholder="Add Username" ref={usernameInput => this.usernameInput = usernameInput}/></Form.Group></td>
                            <td><Form.Group controlId="formBasicText"><Form.Control placeholder="Add Password" ref={passwordInput => this.passwordInput = passwordInput}/></Form.Group></td>
                            <td><Button variant="link" onClick={this.clearAddInput}><MaterialIcons icon="remove_circle" /></Button></td>
                        </tr>
                        {
                            this.state.table_data.map(function(row, index){
                                return (
                                    <tr key={row.username}>
                                        <td>{index+1}</td>
                                        <td>{row.username}</td>
                                        <td>{row.password}</td>
                                        <td><Button variant="link"><MaterialIcons icon="remove_circle" /></Button></td>
                                    </tr>
                                )
                            })
                        }
                    </Table>
                </div>
                <Footer/>
                <Sweetalert danger confirmBtnText="I Understand" confirmBtnBsStyle="danger" title="Data Error" show = {this.state.loginAlertShow} onConfirm = {this.handleLoginAlertClose}>
                    {this.state.loginAlertText}
                </Sweetalert>
            </Container>
        )
    }
}

export default AdminDashboard;