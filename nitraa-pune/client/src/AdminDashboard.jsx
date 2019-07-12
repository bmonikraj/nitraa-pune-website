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
import { runInThisContext } from 'vm';

class AdminDashboard extends React.Component{

    constructor(props){
        super(props);
        this.handleLoginAlertOpen = this.handleLoginAlertOpen.bind(this);
        this.handleLoginAlertClose = this.handleLoginAlertClose.bind(this);
        this.fetchRow = this.fetchRow.bind(this);
        this.fetchMembershipPlanRow = this.fetchMembershipPlanRow.bind(this);
        this.clearAddInput = this.clearAddInput.bind(this);
        this.clearAddInputMP = this.clearAddInputMP.bind(this);
        this.addRow = this.addRow.bind(this);
        this.addMembershipPlanRow = this.addMembershipPlanRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.removeMembershipPlanRow = this.removeMembershipPlanRow.bind(this);
        this.state = {
            table_data : [],
            membershipPlanArr: [],
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
        this.fetchMembershipPlanRow();
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

    fetchMembershipPlanRow(){
      var _self = this;
      axios({
          url : '/admin-moderator-crud/membership-reg',
          method : 'get',
          headers : {
              authtoken:localStorage.getItem('authtoken')
          }
      })
      .then(function(response){
          console.log(response);
          if(response.data.status == 'success'){
              _self.setState({membershipPlanArr : response.data.data});
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

    addMembershipPlanRow(){
        var _self = this;
        axios({
            url : '/admin-moderator-crud/membership-reg',
            method : 'post',
            headers : {
                authtoken:localStorage.getItem('authtoken')
            },
            data : {
                name : _self.membershipPlanName.value,
                days : _self.membershipPlanDays.value,
                cost : _self.membershipPlanCost.value,
                desc : _self.membershipPlanDesc.value
            }
        })
        .then(function(response1){
            console.log(response1);
            if(response1.data.status == 'success'){
                _self.fetchMembershipPlanRow();
                _self.clearAddInputMP();
            }
            else{
                _self.setState({loginAlertText : response1.data.message});
                _self.handleLoginAlertOpen();
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }

    removeRow(element){
        var _self = this;
        console.log(element.target);
        var _element_value = element.target.value;
        axios({
            url : '/admin-moderator-crud',
            method : 'delete',
            headers : {
                authtoken:localStorage.getItem('authtoken')
            },
            data : {
                username : _element_value
            }
        })
        .then(function(response){
            console.log(response);
            if(response.data.status == 'success'){
                var new_array = _self.state.table_data;
                var _p_ele = _element_value;
                var array_filtered = new_array.filter(function(v,i,a){
                    return v.username != _p_ele;
                }, _p_ele);
                console.log(array_filtered);
                _self.setState({table_data : array_filtered});
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

    removeMembershipPlanRow(element){
        var _self = this;
        console.log(element.target);
        var _element_value = element.target.value;
        axios({
            url : '/admin-moderator-crud/membership-reg',
            method : 'delete',
            headers : {
                authtoken:localStorage.getItem('authtoken')
            },
            data : {
                mpId : _element_value
            }
        })
        .then(function(response1){
            console.log(response1);
            if(response1.data.status == 'success'){
                _self.fetchMembershipPlanRow();
            }
            else{
                _self.setState({loginAlertText : response1.data.message});
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
    clearAddInputMP(){
        this.membershipPlanName.value = "";
        this.membershipPlanDays.value = "";
        this.membershipPlanCost.value = "";
        this.membershipPlanDesc.value = "";
    }

    render(){

        const _p = this;

        const styleTableDiv = {
            paddingTop : '15vh',
            paddingBottom : '1vh'
        }
        const styleTableDiv2 = {
            paddingTop : '1vh',
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
                            <th><Button variant="link" onClick={this.clearAddInput}><MaterialIcons icon="backspace" /></Button></th>
                        </tr>
                        <tr>
                            <td>Add Moderator</td>
                            <td><Form.Group controlId="formBasicText"><Form.Control placeholder="Add Username" ref={usernameInput => this.usernameInput = usernameInput}/></Form.Group></td>
                            <td><Form.Group controlId="formBasicText"><Form.Control placeholder="Add Password" ref={passwordInput => this.passwordInput = passwordInput}/></Form.Group></td>
                            <td><Button variant="outline-success" onClick={this.addRow}>Add</Button></td>
                        </tr>
                        {
                            this.state.table_data.map(function(row, index){
                                return (
                                    <tr key={row.username}>
                                        <td>{index+1}</td>
                                        <td>{row.username}</td>
                                        <td>{row.password}</td>
                                        <td><Button variant="outline-danger" value={row.username} onClick={_p.removeRow}>Remove</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </Table>
                </div>
                <div style={styleTableDiv2}>
                    <Table style={styleTable} responsive bordered striped variant="light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Days</th>
                            <th>Cost</th>
                            <th>Description</th>
                            <th><Button variant="link" onClick={this.clearAddInputMP}><MaterialIcons icon="backspace" /></Button></th>
                        </tr>
                        <tr>
                            <td>Add Membership Plans</td>
                            <td><Form.Group controlId="formBasicText"><Form.Control placeholder="Name" ref={nameIP => this.membershipPlanName = nameIP}/></Form.Group></td>
                            <td><Form.Group controlId="formBasicText"><Form.Control type="number" placeholder="Days" ref={daysIP => this.membershipPlanDays = daysIP}/><Form.Text>Put <b>-1</b> for lifetime access</Form.Text></Form.Group></td>
                            <td><Form.Group controlId="formBasicText"><Form.Control type="number" placeholder="Cost" ref={costIP => this.membershipPlanCost = costIP}/></Form.Group></td>
                            <td><Form.Group controlId="formBasicText"><Form.Control as="textarea" placeholder="Description" ref={descIP => this.membershipPlanDesc = descIP}/></Form.Group></td>
                            <td><Button variant="outline-success" onClick={this.addMembershipPlanRow}>Add</Button></td>
                        </tr>
                        {
                            this.state.membershipPlanArr.map(function(row, index){
                                return (
                                    <tr key={row._id}>
                                        <td>{index+1}</td>
                                        <td>{row.name}</td>
                                        <td>{row.days}</td>
                                        <td>{row.cost}</td>
                                        <td>{row.desc}</td>
                                        <td><Button variant="outline-danger" value={row._id} onClick={_p.removeMembershipPlanRow}>Remove</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </Table>
                </div>
                <Footer/>
                <Sweetalert danger confirmBtnText="I Understand" confirmBtnBsStyle="primary" title="Data Error" show = {this.state.loginAlertShow} onConfirm = {this.handleLoginAlertClose}>
                    {this.state.loginAlertText}
                </Sweetalert>
            </Container>
        )
    }
}

export default AdminDashboard;
