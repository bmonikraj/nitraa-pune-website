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
        this.handleChangeYOP = this.handleChangeYOP.bind(this);
        this.handleChangeBranch = this.handleChangeBranch.bind(this);
        this.handleChangeOrganization = this.handleChangeOrganization.bind(this);
        this.handleChangePreAdr = this.handleChangePreAdr.bind(this);
        this.handleChangePerAdr = this.handleChangePerAdr.bind(this);
        this.handleChangeMob = this.handleChangeMob.bind(this);
        this.handleChangeHobbies = this.handleChangeHobbies.bind(this);
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
        this.removeProfilePic = this.removeProfilePic.bind(this);
        this.handleProfileAlertOpen = this.handleProfileAlertOpen.bind(this);
        this.handleProfileAlertClose = this.handleProfileAlertClose.bind(this);
        this.state = {
            email: "",
            full_name: "",
            date_of_birth: "",
            present_address: "",
            permanent_address: "",
            mobile_number: "",
            hobbies: [],
            alertShow: false,
            alertText: "",
            hobb: "",
            yop: "",
            branch: "",
            organization: "",
            profile_pic_ext: null,
            reg_due_stamp: 0,
            removeBtnShow: "none",
            profile_pic_name: "",
            personalPicsArrFetched: 0,
            personalPicsArr: [],
            profileAlertText: "",
            profileAlertType: "danger",
            profileAlertTitle: "",
            profileAlertShow: false,
            membershipPlansArr: [],
            membershipPlansFetched: 0,
            selectedMembershipPlanId: "",
            paymentConfirmShow: false
        }
    }
    handleProfileAlertOpen(){
      this.setState({
        profileAlertShow: true
      });
    }
    handleProfileAlertClose(){
      this.setState({
        profileAlertShow: false
      });
      if(this.state.profileAlertType === "success"){
        window.open("/profile", "_self");
      }
    }
    componentDidMount(){
        var params = queryString.parse(this.props.location.search);
        if(params.message)
        {
            this.setState({
              profileAlertText: params.message,
              profileAlertType: params.alertType,
              profileAlertTitle: params.title
            });
            this.handleProfileAlertOpen();
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
                    var hobbiesText, profilePicPath, displayRemovePicButton;

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
                        hobbies: response.data.data.hobbies,
                        yop: response.data.data.yop,
                        branch: response.data.data.branch,
                        organization: response.data.data.organization,
                        hobb: hobbiesText,
                        profile_pic_ext: response.data.data.cover_pic_ext,
                        profile_pic_name: profilePicPath,
                        reg_due_stamp: response.data.data.due_timestamp,
                        removeBtnShow: displayRemovePicButton
                    });
                }
                else
                {
                    _self_parent.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Profile Details"});
                    _self_parent.handleProfileAlertOpen();
                }
            })
            .catch(function(error){
                _self_parent.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Profile Details"});
                _self_parent.handleProfileAlertOpen();
                console.log(error);
            });

            axios({
              method: "get",
              url: "/personal-pictures",
              headers: {
                'authtoken': localStorage.getItem('authtoken')
              }
            }).then((response) => {
              if(response.data.status === "success"){
                _self_parent.setState({personalPicsArrFetched: 1, personalPicsArr: response.data.data});
              }
              else{
                _self_parent.setState({personalPicsArrFetched: 300});
              }
            }).catch((error) => {
              _self_parent.setState({personalPicsArrFetched: 300});
            })

            axios({
              method: "get",
              url: "/admin-moderator-crud/membership-reg",
              headers: {
                authtoken: localStorage.getItem("authtoken")
              }
            }).then((response) => {
              if(response.data.status === "success"){
                _self_parent.setState({membershipPlansFetched: 1, membershipPlansArr: response.data.data});
              }
              else{
                _self_parent.setState({membershipPlansFetched: 300});
              }
            }).catch((error) => {
              _self_parent.setState({membershipPlansFetched: 300});
            })
        }
    }

    handleChangeFullName(event){
        console.log(event.target.value);
        this.setState({ full_name: event.target.value });
    }
    handleChangeDOB(event){
        console.log(event.target.value);
        this.setState({ date_of_birth: event.target.value.toString() });
    }
    handleChangeYOP(event){
        console.log(event.target.value);
        this.setState({ yop: event.target.value.toString() });
    }
    handleChangePreAdr(event){
        console.log(event.target.value);
        this.setState({ present_address: event.target.value });
    }
    handleChangePerAdr(event){
        console.log(event.target.value);
        this.setState({ permanent_address: event.target.value });
    }
    handleChangeMob(event){
        console.log(event.target.value);
        this.setState({ mobile_number: event.target.value });
    }
    handleChangeBranch(event){
      console.log(event.target.value);
      this.setState({ branch: event.target.value });
    }
    handleChangeOrganization(event){
      console.log(event.target.value);
      this.setState({ organization: event.target.value });
    }
    handleChangeHobbies(event){
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
          if(($("#ProfilePic")[0].files[0].type === "image/jpeg" || $("#ProfilePic")[0].files[0].type === "image/png") && $("#ProfilePic")[0].files[0].size <= 1048576){
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
                  _self_parent.setState({profileAlertText: "Successfully Uploaded", profileAlertType: "success", profileAlertTitle: "Profile Image Upload"});
                  _self_parent.handleProfileAlertOpen();
                }
                else
                {
                  _self_parent.setState({profileAlertText: "Unexpected Error Occured. Please try later.", profileAlertType: "danger", profileAlertTitle: "Profile Image Upload"});
                  _self_parent.handleProfileAlertOpen();
                }
            })
            .catch(function(error){
                _self_parent.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Profile Image Upload"});
                _self_parent.handleProfileAlertOpen();
                console.log(error);
            });
          }
          else{
            _self_parent.setState({profileAlertText: "File size should not exceed 1MB and should be either jpg/jpeg/png format", profileAlertType: "danger", profileAlertTitle: "Profile Image Upload"});
            _self_parent.handleProfileAlertOpen();
          }
        }
        else
        {
            _self_parent.setState({profileAlertText: "Please Select a Profile Pic", profileAlertType: "danger", profileAlertTitle: "Profile Image Upload"});
            _self_parent.handleProfileAlertOpen();
        }
    }
    removeProfilePic(){
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
                _self_parent.setState({profileAlertText: "Successfully Removed", profileAlertType: "success", profileAlertTitle: "Profile Image Remove"});
                _self_parent.handleProfileAlertOpen();
            }
            else
            {
                _self_parent.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Profile Image Remove"});
                _self_parent.handleProfileAlertOpen();
            }
        })
        .catch(function(error){
            _self_parent.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Profile Image Remove"});
            _self_parent.handleProfileAlertOpen();
            console.log(error);
        });
    }
    uploadImage(){

      if($("#PersonalPic")[0].files[0]){
        console.log($("#PersonalPic")[0].files[0]);
        if(($("#PersonalPic")[0].files[0].type === "image/jpeg" || $("#PersonalPic")[0].files[0].type === "image/png") && $("#PersonalPic")[0].files[0].size <= 1048576){
          var formData = new FormData();
          formData.append("ImageFile", $("#PersonalPic")[0].files[0]);
          var _self = this;
          axios({
            method: "post",
            url: "/personal-pictures",
            data: formData,
            headers: {
              authtoken: localStorage.getItem('authtoken')
            }
          }).then(response => {
            if(response.data.status === "success"){
              _self.setState({profileAlertText: "Successfully Uploaded", profileAlertType: "success", profileAlertTitle: "Personal Image Upload"});
              _self.handleProfileAlertOpen();
            }
            else{
              _self.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Personal Image Upload"});
              _self.handleProfileAlertOpen();
            }
          }).catch(error => {
            _self.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Personal Image Upload"});
            _self.handleProfileAlertOpen();
          })
        }
        else{
          this.setState({profileAlertText: "File size should not exceed 1MB and should be either jpg/jpeg/png format", profileAlertType: "danger", profileAlertTitle: "Personal Image Upload"});
          this.handleProfileAlertOpen();
        }
      }
      else{
        this.setState({profileAlertText: "Please select a file", profileAlertType: "danger", profileAlertTitle: "Personal Image Upload"});
        this.handleProfileAlertOpen();
      }
    }
    deleteImage(image_id){
      let _self = this;
      axios({
        method: "delete",
        url: "/personal-pictures",
        data: {
          imageId: image_id
        },
        headers: {
          authtoken: localStorage.getItem('authtoken')
        }
      }).then(response => {
        if(response.data.status === "success"){
          _self.setState({profileAlertText: "Successfully Uploaded", profileAlertType: "success", profileAlertTitle: "Personal Image Remove"});
          _self.handleProfileAlertOpen();
        }
        else{
          _self.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Personal Image Remove"});
          _self.handleProfileAlertOpen();
        }
      }).catch(error => {
        _self.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Personal Image Remove"});
        _self.handleProfileAlertOpen();
      })
    }
    handleSubmit(){
        if(!this.state.date_of_birth)
        {
            this.setState({profileAlertText: "Please select date of Birth", profileAlertType: "danger", profileAlertTitle: "Profile Details"});
            this.handleProfileAlertOpen();
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
                    branch: this.state.branch,
                    organization : this.state.organization,
                    hobbies: this.state.hobbies,
                    yop: this.state.yop
                }
            })
            .then(function(response){
                if(response.data.status == 'success')
                {
                    _self_parent.setState({profileAlertText: "Successfully Updated", profileAlertType: "success", profileAlertTitle: "Profile Details"});
                    _self_parent.handleProfileAlertOpen();
                }
                else
                {
                    _self_parent.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Profile Details"});
                    _self_parent.handleProfileAlertOpen();
                }
            })
            .catch(function(error){
                console.log(error);
                _self_parent.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Profile Details"});
                _self_parent.handleProfileAlertOpen();
            });
        }
    }
    activateMembership(mpID){
      this.setState({paymentConfirmShow: false})
      let _self = this;
      axios({
        method: "post",
        url: "/member-reg/payment",
        data: {
          mpId: mpID
        },
        headers: {
          authtoken: localStorage.getItem("authtoken")
        }
      }).then(response => {
        if(response.data.status === "success"){
          window.open(response.data.longURL, "_self");
        }
        else{
          _self.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Membership Renewal"});
          console.log(response.data.message);
          _self.handleProfileAlertOpen();
        }
      }).catch(error => {
        _self.setState({profileAlertText: "Unexpected Error Occured", profileAlertType: "danger", profileAlertTitle: "Membership Renewal"});
        _self.handleProfileAlertOpen();
      })
    }
    showActivateMembershipAlert(mpId){
      this.setState({selectedMembershipPlanId: mpId, paymentConfirmShow: true});
    }

    cancelPayment(){
      this.setState({paymentConfirmShow: false});
    }

    render() {
        var styleTableDiv = {
            marginTop : '1rem',
            marginBottom : '15vh',
            background : "#eeeeee",
            padding: "10px"
        }
        const formStyle = {
            marginTop: "5vh",
            marginBottom: "1rem"
        }
        const formLabelStyle = {
            color: "#ffffff"
        }
        const centreText = {
            margin: "0.5em auto 0em",
            color: "white",
            fontSize: "1.3rem"
        }
        const dummy = process.env.PUBLIC_URL + "images/dummy.png";
        const profile_pic_style = {
            width: "100%",
            height: "auto"
        };
        let elem;
        if(this.state.personalPicsArrFetched === 0){
          elem = <center><h5>Loading..</h5></center>
        }
        else if(this.state.personalPicsArrFetched === 300){
          elem = <center><h5>Something went wrong. Please try again later..</h5></center>
        }
        else if(this.state.personalPicsArrFetched === 1){
          if(this.state.personalPicsArr.length === 0){
            elem = <center><h5>No photos..</h5></center>
          }
          else{
            elem = (
              <Row>
                {this.state.personalPicsArr.map(item => {
                  return (
                    <Col xs={12} md={3}>
                      <div>
                        <img className="w-100" src={process.env.PUBLIC_URL + "images/personal_pictures/" + item.imageFileName}/>
                      </div>
                      <div>
                        <Button variant="outline-info" onClick={this.deleteImage.bind(this, item._id)} block>Delete</Button>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            );
          }
        }
        let elem2;
        if(this.state.membershipPlansFetched === 0){
          elem2  = <center><h5>Loading ...</h5></center>
        }
        else if(this.state.membershipPlansFetched === 300){
          elem2  = <center><h5>Something Went Wrong. Please try later ..</h5></center>
        }
        else if(this.state.membershipPlansFetched === 1){
          if(this.state.membershipPlansArr.length === 0){
            elem2  = <center><h5>No membership plans available..</h5></center>
          }
          else{
            elem2 = this.state.membershipPlansArr.map(item => {
              return (
                <Col xs={12} md={3} style={{padding: "5px", display: "inline-flex"}}>
                  <Container style={{border: "1px dotted grey", borderRadius: "3px", padding: "10px 0", cursor: "pointer"}} onClick={this.showActivateMembershipAlert.bind(this, item._id)}>
                    <div><center><h5 style={{color: "grey"}}>{item.name}</h5></center></div>
                    <hr/>
                    <div><center><h6><b>Days</b></h6></center><center style={{color: "grey"}}><p style={{fontSize: "0.85rem"}}><b>{(item.days>0)?item.days:"Lifetime"}</b></p></center></div>
                    <div><center><h6><b>Fees</b></h6></center><center style={{color: "grey"}}><p style={{fontSize: "0.85rem"}}><b>Rs. {item.cost}</b></p></center></div>
                    <div><center><h6><b>Details</b></h6></center><p style={{fontSize: "0.7rem", padding: "5px", color: "grey", textAlign: "center"}}>{item.desc}</p></div>
                  </Container>
                </Col>
              )
            })
          }
        }
        let elem3;
        if(this.state.reg_due_stamp < 0){
          elem3 = <center><h4>You have Lifetime Membership Plan.</h4></center>;
        }
        else{
          if(this.state.reg_due_stamp - new Date().getTime() > 0){
            elem3 = <center><h4>Membership Plan Active till {(new Date(this.state.reg_due_stamp)).toDateString()}.</h4></center>;
          }
          else{
            elem3 = <center><h4>Membership Plan Expired. Choose a Plan.</h4></center>;
          }
        }
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
                                    <Col xs={{offset: 4, span: 5}} md={12}>
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
                            <Col><center><span style={centreText}>Email : {this.state.email}</span></center></Col>
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
                            <Form.Group controlId="ProfileYOP">
                                <Form.Label style={formLabelStyle}>Year of Passing</Form.Label>
                                <Form.Control type="month" value={this.state.yop} onChange={this.handleChangeYOP} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfileYOP">
                                <Form.Label style={formLabelStyle}>Branch</Form.Label>
                                <Form.Control as="select" value={this.state.branch} onChange={this.handleChangeBranch}>
                                  <option value="">--Select Branch--</option>
                                  <option value="Architecture">Architecture</option>
                                  <option value="Biomedical">Biomedical</option>
                                  <option value="Biotechnology">Biotechnology</option>
                                  <option value="Civil">Civil</option>
                                  <option value="Chemical">Chemical</option>
                                  <option value="Ceramic">Ceramic</option>
                                  <option value="Computer Science and Engg.">Comp. Sc. and Engg.</option>
                                  <option value="Electronics and Communication">Electronics and Comm.</option>
                                  <option value="Electrical">Electrical</option>
                                  <option value="Electronics and Instrumentation">Electronics and Ins.</option>
                                  <option value="Food Processing">Food Processing</option>
                                  <option value="Industrial Design">Industrial Design</option>
                                  <option value="Mechanical">Mechanical</option>
                                  <option value="Metallurgical">Metallurgical</option>
                                  <option value="Mining">Mining</option>
                                  <option value="Chemistry">Chemistry</option>
                                  <option value="Life Science">Life Science</option>
                                  <option value="Mathematics">Mathematics</option>
                                  <option value="Physics">Physics</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }}>
                            <Form.Group controlId="ProfileYOP">
                                <Form.Label style={formLabelStyle}>Organization Currently In</Form.Label>
                                <Form.Control type="text" placeholder="Organization currently you are in" value={this.state.organization} onChange={this.handleChangeOrganization} />
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
                            <Form.Group controlId="ProfileHobbies">
                                <Form.Label style={formLabelStyle}>Hobbies</Form.Label>
                                <Form.Control type="text" value={this.state.hobb} placeholder="For multiple values separate using ' , '" onChange={this.handleChangeHobbies} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 3 }} style={{marginBottom: "5em"}}>
                            <Row>
                                <Col xs={6}>
                                    <Button variant="primary" onClick={this.handleSubmit}>
                                        Save Changes
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
                <div style = {styleTableDiv}>
                    <Row>
                      <Col style={{color: "#444"}}>
                        <center><h3><b>MEMBERSHIP</b></h3></center>
                      </Col>
                    </Row>
                    <hr/>
                    <Row>
                      <Col>
                          {elem3}
                      </Col>
                    </Row>
                    <hr/>
                    <Row style ={{padding: "1rem", margin: "0", display: ((this.state.reg_due_stamp<0) || (this.state.reg_due_stamp - new Date().getTime() > 0))?"none":"block"}}>
                      {elem2}
                    </Row>
                </div>
                <div style = {styleTableDiv}>
                    <Row>
                      <Col style={{color: "#444"}}>
                        <center><h3><b>MY PICTURES</b></h3></center>
                      </Col>
                    </Row>
                    <hr style={{display: (this.state.personalPicsArrFetched === 1 && this.state.personalPicsArr.length < 4)?"block":"none"}}/>
                    <Row style={{display: (this.state.personalPicsArrFetched === 1 && this.state.personalPicsArr.length < 4)?"block":"none"}}>
                      <Col xs={{span: 8, offset: 4}} md={{span: 6, offset: 1}} style={{display: "inline-flex"}}>
                          <Row>
                            <Button variant="outline-info" onClick={this.uploadImage.bind(this)}>Upload Image</Button>
                          </Row>
                      </Col>
                      <Col xs={{span: 10, offset: 2}} md={{span: 3}} style={{display: "inline-flex"}}>
                          <Row style={{marginTop: "2px"}}>
                              <Col xs={12} md={12}>
                                  <Form style={{ display: "block"}}>
                                      <Form.Control type="file" id="PersonalPic"></Form.Control>
                                  </Form>
                              </Col>
                          </Row>
                      </Col>
                    </Row>
                    <hr/>
                    <Row style ={{padding: "1rem", margin: "0"}}>
                      <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                        {elem}
                      </Col>
                    </Row>
                </div>
                <Sweetalert type={this.state.profileAlertType} confirmBtnText="OK" confirmBtnBsStyle="primary" title={this.state.profileAlertTitle} show={this.state.profileAlertShow} onConfirm={this.handleProfileAlertClose}>
                    {this.state.profileAlertText}
                </Sweetalert>
                <Sweetalert
                    warning
                    showCancel
                    confirmBtnText="Proceed"
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.activateMembership.bind(this, this.state.selectedMembershipPlanId)}
                    onCancel={this.cancelPayment.bind(this)}
                    show={this.state.paymentConfirmShow}
                >
                    Once paid, cannot be undone.
                </Sweetalert>
                <Footer/>
            </Container>
        )
    }
}

export default Profile;
