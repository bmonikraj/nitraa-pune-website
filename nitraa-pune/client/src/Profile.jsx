import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { SocialIcon } from 'react-social-icons';
import Sweetalert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import queryString from 'query-string';
import $ from 'jquery';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFullName = this.handleChangeFullName.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleChangePreAdr = this.handleChangePreAdr.bind(this);
        this.handleChangePerAdr = this.handleChangePerAdr.bind(this);
        this.handleChangeMob = this.handleChangeMob.bind(this);
        this.handleChangeFather = this.handleChangeFather.bind(this);
        this.handleChangeMother = this.handleChangeMother.bind(this);
        this.handleChangeSpouse = this.handleChangeSpouse.bind(this);
        this.handleChangeChildren = this.handleChangeChildren.bind(this);
        this.handleChangeSiblings = this.handleChangeSiblings.bind(this);
        this.handleChangeHobbies = this.handleChangeHobbies.bind(this);
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
        this.removeProfilePic = this.removeProfilePic.bind(this);
        this.state = {
            email: "",
            full_name: "",
            date_of_birth: "",
            present_address: "",
            permanent_address: "",
            mobile_number: "",
            father: "",
            mother: "",
            spouse: "",
            siblings: [],
            children: [],
            hobbies: [],
            alertShow: false,
            alertText: "",
            sibl: "",
            chil: "",
            hobb: "",
            profile_pic_ext: null,
            removeBtnShow: "none",
            profile_pic_name: ""
        }
    }
    componentDidMount(){
        var params = queryString.parse(this.props.location.search);
        if(params.message)
        {
            this.setState({
                alertShow: true,
                alertText: params.message
            });
        }
        if(!(localStorage.getItem('profile'))){
            window.open("/login", "_self");
        }
        else
        {
            var _self_parent = this;
            axios({
                method: 'get',
                url: '/profile/read',
                headers: { 'authtoken': localStorage.getItem('authtoken').toString() }
            })
            .then(function(response){
                if(response.data.status == "success")
                {
                    var siblingText, childrenText, hobbiesText, profilePicPath, displayRemovePicButton;
                    if(response.data.data.siblings.length == 0)
                    {
                        siblingText = "";
                    }
                    else
                    {
                        siblingText = response.data.data.siblings[0];
                    }
                    for(var i = 1;i < response.data.data.siblings.length; i++)
                    {
                        siblingText = siblingText + "," + response.data.data.siblings[i] ;
                    }

                    if(response.data.data.children.length == 0)
                    {
                        childrenText = "";
                    }
                    else
                    {
                        childrenText = response.data.data.children[0];
                    }
                    for(var i = 1;i < response.data.data.children.length; i++)
                    {
                        childrenText = childrenText + "," + response.data.data.children[i] ;
                    }

                    if(response.data.data.hobbies.length == 0)
                    {
                        hobbiesText = "";
                    }
                    else
                    {
                        hobbiesText = response.data.data.hobbies[0];
                    }
                    for(var i = 1;i < response.data.data.hobbies.length; i++)
                    {
                        hobbiesText = hobbiesText + "," + response.data.data.hobbies[i] ;
                    }

                    if(response.data.data.cover_pic_ext == null)
                    {
                        profilePicPath = process.env.PUBLIC_URL + "images/dummy.png";
                        displayRemovePicButton = "none";
                        //_self_parent.setState({removeBtnShow: false});
                    }
                    else
                    {
                        profilePicPath = process.env.PUBLIC_URL + "images/profile_pictures/"+response.data.data._id.toString() + "."+ response.data.data.cover_pic_ext;
                        displayRemovePicButton = "inline";
                        //_self_parent.setState({removeBtnShow: true});
                    }

                    _self_parent.setState({
                        email: response.data.data.email,
                        full_name: response.data.data.name,
                        date_of_birth: response.data.data.dob,
                        present_address: response.data.data.address,
                        permanent_address: response.data.data.permanent_adr,
                        mobile_number: response.data.data.phone,
                        father: response.data.data.father,
                        mother: response.data.data.mother,
                        spouse: response.data.data.spouse_name,
                        siblings: response.data.data.siblings,
                        children: response.data.data.children,
                        hobbies: response.data.data.hobbies,
                        sibl: siblingText,
                        chil: childrenText,
                        hobb: hobbiesText,
                        profile_pic_ext: response.data.data.cover_pic_ext,
                        profile_pic_name: profilePicPath,
                        removeBtnShow: displayRemovePicButton
                    });
                }
                else
                {
                    _self_parent.setState({alertShow: true, alertText: response.data.message});
                }
            })
            .catch(function(error){
                console.log(error);
            });
        }
    }

    handleChangeFullName(event)
    {
        console.log(event.target.value);
        this.setState({ full_name: event.target.value });
    }

    handleChangeDOB(event)
    {
        console.log(event.target.value);
        this.setState({ date_of_birth: event.target.value.toString() });
    }

    handleChangePreAdr(event)
    {
        console.log(event.target.value);
        this.setState({ present_address: event.target.value });
    }

    handleChangePerAdr(event)
    {
        console.log(event.target.value);
        this.setState({ permanent_address: event.target.value });
    }

    handleChangeMob(event)
    {
        console.log(event.target.value);
        this.setState({ mobile_number: event.target.value });
    }

    handleChangeFather(event)
    {
        console.log(event.target.value);
        this.setState({ father: event.target.value });
    }

    handleChangeMother(event)
    {
        console.log(event.target.value);
        this.setState({ mother: event.target.value });
    }

    handleChangeSpouse(event)
    {
        console.log(event.target.value);
        this.setState({ spouse: event.target.value });
    }

    handleChangeChildren(event)
    {
        console.log(event.target.value);
        this.setState({chil: event.target.value});
        if(event.target.value.split(',').length == 1)
        {
            if((event.target.value.split(','))[0] === "")
            {
                this.setState({ children: [] });
            }
            else
            {
                this.setState({ children: event.target.value.split(',') });
            }
        }
        else
        {
            this.setState({ children: event.target.value.split(',') });
        }
    }

    handleChangeSiblings(event)
    {
        console.log(event.target.value);
        this.setState({sibl: event.target.value});
        if(event.target.value.split(',').length == 1)
        {
            if((event.target.value.split(','))[0] === "")
            {
                this.setState({ siblings: [] });
            }
            else
            {
                this.setState({ siblings: event.target.value.split(',') });
            }
        }
        else
        {
            this.setState({ siblings: event.target.value.split(',') });
        }
    }

    handleChangeHobbies(event)
    {
        console.log(event.target.value);
        this.setState({hobb: event.target.value});
        if(event.target.value.split(',').length == 1)
        {
            if((event.target.value.split(','))[0] === "")
            {
                this.setState({ hobbies: [] } );
            }
            else
            {
                this.setState({ hobbies: event.target.value.split(',') } );
            }
        }
        else
        {
            this.setState({ hobbies: event.target.value.split(',') });
        }
    }

    uploadProfilePic(){
        if($("#ProfilePic")[0].files[0])
        {
            const formdata = new FormData();
            console.log($("#ProfilePic")[0].files[0]);
            formdata.append('ImageFile', $("#ProfilePic")[0].files[0]);
            var _self_parent = this;
            axios({
                method: "post",
                url: "/profile/profilePicUpload",
                headers: {
                    authtoken: localStorage.getItem('authtoken'),
                    'Content-Type': 'multipart/form-data'
                },
                data: formdata
            })
            .then(function(response){
                if(response.data.status == "success")
                {
                    window.open("/profile?message=Successfully%20Uploaded", "_self");
                }
                else
                {
                    _self_parent.setState({
                        alertShow: true,
                        alertText: response.data.message
                    });
                }
            })
            .catch(function(error){
                console.log(error);
            });
        }
        else
        {
            this.setState({
                alertShow: true,
                alertText: "Please Select a Profile Pic!"
            });
        }
    }

    removeProfilePic()
    {
        var _self_parent = this;
        axios({
            method: "get",
            url: "/profile/profilePicRemove",
            headers: {
                authtoken: localStorage.getItem('authtoken')
            }
        })
        .then(function(response){
            if(response.data.status == "success")
            {
                window.open("/profile?message=Successfully%20Removed", "_self");
            }
            else
            {
                _self_parent.setState({
                    alertShow: true,
                    alertText: response.data.message
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }

    handleSubmit()
    {
        if(!this.state.date_of_birth)
        {
            this.setState({alertShow: true, alertText: "Please select date of Birth"});
        }
        else
        {
            var _self_parent = this;
            axios({
                method: 'put',
                url: '/profile/update',
                headers: {
                    'authtoken': localStorage.getItem('authtoken').toString()
                },
                data: {
                    name: this.state.full_name,
                    dob : this.state.date_of_birth,
                    address: this.state.present_address,
                    permanent_adr: this.state.permanent_address,             
                    phone: this.state.mobile_number,
                    father: this.state.father,
                    mother : this.state.mother,
                    spouse_name: this.state.spouse,
                    children: this.state.children,
                    siblings: this.state.siblings,
                    hobbies: this.state.hobbies
                }
            })
            .then(function(response){
                if(response.data.status == 'success')
                {
                    _self_parent.setState({alertShow: false});
                    window.open("/profile?status=success&message=Updated%20Successfully", "_self");
                }
                else
                {
                    _self_parent.setState({alertShow: true, alertText: response.data.message});
                }
            })
            .catch(function(error){
                console.log(error);
            });
        }
    }

    render() {
        const formStyle = {
            marginTop: "5vh"
        }
        const formLabelStyle = {
            color: "#ffffff"
        }
        const centreText = {
            margin: "0.5em auto 0em",
            color: "white",
            fontSize: "1.5em"
        }
        const dummy = process.env.PUBLIC_URL + "images/dummy.png";
        const profile_pic_style = {
            width: "100%",
            height: "auto"
        };
        return (
            <Container>
                <Header />
                <Row style={{marginTop: "10em"}}>
                    <Col xs={12} md={{ span: 6, offset: 3 }}>
                        <Row>
                            <span style={{margin: "0.5em auto 1em", color: "yellow"}} show={this.state.alertShow}>{this.state.alertText}</span>
                        </Row>
                        <Row style={{marginTop: "1em"}}>
                            <Col xs={{span: 12}} md={{span: 6, offset: 1}}>
                                <Row>
                                <a href="javascript:void(0)" style={{color: "powderblue", margin:"auto", display: "block"}} onClick={this.uploadProfilePic}>Change/Upload Profile Picture</a>
                                </Row>
                            </Col>
                            <Col xs={{span: 12}} md={{span: 3}}>
                                <Row>
                                    <Col xs={{offset: 4, span: 4}} md={12}>
                                        <Form style={{ display: "block"}}>
                                            <Form.Control type="file" id="ProfilePic"></Form.Control>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{marginTop: "0.5em"}}>
                                <a href="javascript:void(0)" style={{color: "grey", display: this.state.removeBtnShow, margin: "auto"}} onClick={this.removeProfilePic}>Remove Profile Pic</a>
                        </Row>
                        <Row style={{marginTop: "0.5em"}}>
                            <Col xs={{span: 6, offset: 3}} md={{span: 4, offset: 4}} >
                                <Image src={this.state.profile_pic_name} alt="productImg" style={profile_pic_style} thumbnail />
                            </Col>
                        </Row>
                        <Row>
                            <span style={centreText}>Email : {this.state.email}</span>
                        </Row>
                    </Col>
                </Row>
                <Form style={formStyle}>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfileName">
                                <Form.Label style={formLabelStyle}>Full Name</Form.Label>
                                <Form.Control type="text" value={this.state.full_name} placeholder="Full Name" onChange={this.handleChangeFullName} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfileDOB">
                                <Form.Label style={formLabelStyle}>Date of Birth</Form.Label>
                                <Form.Control type="date" value={this.state.date_of_birth} onChange={this.handleChangeDOB} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfilePreAddress">
                                <Form.Label style={formLabelStyle}>Present Address</Form.Label>
                                <Form.Control type="text" value={this.state.present_address} placeholder="Present Address" onChange={this.handleChangePreAdr} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfilePerAddress">
                                <Form.Label style={formLabelStyle}>Permanent Address</Form.Label>
                                <Form.Control type="text" value={this.state.permanent_address} placeholder="Permanent Address" onChange={this.handleChangePerAdr} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfilePhone">
                                <Form.Label style={formLabelStyle}>Mobile Number</Form.Label>
                                <Form.Control type="text" value={this.state.mobile_number} placeholder="Phone Number" onChange={this.handleChangeMob} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfileFather">
                                <Form.Label style={formLabelStyle}>Father's Name</Form.Label>
                                <Form.Control type="text" value={this.state.father} placeholder="Father's name in full" onChange={this.handleChangeFather} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfileMother">
                                <Form.Label style={formLabelStyle}>Mother's Name</Form.Label>
                                <Form.Control type="text" value={this.state.mother} placeholder="Mother's name in full" onChange={this.handleChangeMother} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfileSpouse">
                                <Form.Label style={formLabelStyle}>Spouse's Name</Form.Label>
                                <Form.Control type="text" value={this.state.spouse} placeholder="Spouse's name in full" onChange={this.handleChangeSpouse} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfileChildren">
                                <Form.Label style={formLabelStyle}>Children</Form.Label>
                                <Form.Control type="text" value={this.state.chil} placeholder="For multiple values separate using ' , '" onChange={this.handleChangeChildren} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfileSiblings">
                                <Form.Label style={formLabelStyle}>Siblings</Form.Label>
                                <Form.Control type="text" value={this.state.sibl} placeholder="For multiple values separate using ' , '" onChange={this.handleChangeSiblings} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfileHobbies">
                                <Form.Label style={formLabelStyle}>Hobbies</Form.Label>
                                <Form.Control type="text" value={this.state.hobb} placeholder="For multiple values separate using ' , '" onChange={this.handleChangeHobbies} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }} style={{marginBottom: "5em"}}>
                            <Row>
                                <Col xs={4}>
                                    <Button variant="primary" onClick={this.handleSubmit}>
                                        Save Changes
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
                {/* <Sweetalert danger confirmBtnText="I Understand" confirmBtnBsStyle="primary" title="Authentication Error" show={this.state.loginAlertShow} onConfirm={this.handleLoginAlertClose}>
                    {this.state.loginAlertText}
                </Sweetalert> */}
                <Footer />
            </Container>
        )
    }
}

export default Profile;