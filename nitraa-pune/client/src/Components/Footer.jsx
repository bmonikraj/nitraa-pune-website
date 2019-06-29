import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import MediaQuery from 'react-responsive';
import MaterialIcons from 'material-icons-react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../font.css';

class Footer extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            contactUs_Show : false,
            privacyPolicy_Show : false,
            termsUsage_Show : false,
            developerTeam_Show: false
        }

        this.handleContactUs = this.handleContactUs.bind(this);
        this.handlePrivacyPolicy = this.handlePrivacyPolicy.bind(this);
        this.handleTermsUsage = this.handleTermsUsage.bind(this);
        this.handleDeveloperTeam = this.handleDeveloperTeam.bind(this);
    }

    handleContactUs(){
        if(this.state.contactUs_Show){
            this.setState({contactUs_Show : false});
        }
        else{
            this.setState({contactUs_Show : true});
        }
    }

    handleDeveloperTeam(){
      if(this.state.developerTeam_Show){
          this.setState({developerTeam_Show : false});
      }
      else{
          this.setState({developerTeam_Show : true});
      }
    }

    handlePrivacyPolicy(){
        if(this.state.privacyPolicy_Show){
            this.setState({privacyPolicy_Show : false});
        }
        else{
            this.setState({privacyPolicy_Show : true});
        }
    }

    handleTermsUsage(){
        if(this.state.termsUsage_Show){
            this.setState({termsUsage_Show : false});
        }
        else{
            this.setState({termsUsage_Show : true});
        }
    }

    render(){
        const itemStyle = {
            display:"inline-flex",
            verticleAlign:"middle",
            fontSize: "small",
            fontWeight: "bold"
        }
        return (
            <Container>

                <Navbar bg="light" fixed="bottom">
                        <MediaQuery query="(min-device-width: 769px)">
                          <Row style={{width: "100%"}}>
                            <Col>
                              <center>
                                <Row style={{width: "30%"}}>
                                    <Col xs={12} style={{marginBottom: "0.3rem", fontSize: "0.8rem"}}>
                                      <center>Developed by <a style={{color: "grey", cursor: "pointer"}} onClick={this.handleDeveloperTeam}><b>Monik Raj Behera and Team</b></a></center>
                                    </Col>
                                    <Col xs={3}>
                                        <Nav.Link>
                                            <OverlayTrigger
                                            key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id={`Contact Us`}>
                                                    Contact Us
                                                </Tooltip>
                                            }
                                            >
                                                <MaterialIcons onClick={this.handleContactUs} icon="call" size="small"/>
                                            </OverlayTrigger>
                                        </Nav.Link>
                                    </Col>
                                    <Col xs={3}>
                                        <Nav.Link href="#">
                                                <OverlayTrigger
                                                key="top"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={`FAQ`}>
                                                        Frequently Asked Questions
                                                    </Tooltip>
                                                }
                                                >
                                                    <MaterialIcons icon="help" size="small"/>
                                                </OverlayTrigger>
                                        </Nav.Link>
                                    </Col>
                                    <Col xs={3}>
                                        <Nav.Link href="#">
                                                <OverlayTrigger
                                                key="top"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={`Privacy Policy`}>
                                                        Privacy Policy
                                                    </Tooltip>
                                                }
                                                >
                                                    <MaterialIcons onClick={this.handlePrivacyPolicy} icon="phonelink_lock" size="small"/>
                                                </OverlayTrigger>
                                        </Nav.Link>
                                    </Col>
                                    <Col xs={3}>
                                        <Nav.Link href="#" style={itemStyle}>
                                                <OverlayTrigger
                                                key="top"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={'Terms Of Usage'}>
                                                        Terms Of Usage
                                                    </Tooltip>
                                                }
                                                >
                                                    <MaterialIcons onClick={this.handleTermsUsage} icon="ballot" size="small"/>
                                                </OverlayTrigger>
                                        </Nav.Link>
                                    </Col>
                                </Row>
                              </center>
                            </Col>
                          </Row>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 768px)">
                          <Row style={{width: "100%"}}>
                            <Col>
                              <center>
                                <Row style={{width: "90%", marginLeft: "5%"}}>
                                    <Col xs={12} style={{marginBottom: "0.3rem", fontSize: "0.8rem"}}>
                                      <center>Developed by <a style={{color: "grey", cursor: "pointer"}} onClick={this.handleDeveloperTeam}><b>Monik Raj Behera and Team</b></a></center>
                                    </Col>
                                    <Col xs={3}>
                                        <MaterialIcons onClick={this.handleContactUs} icon="call" size="small"/>
                                    </Col>
                                    <Col xs={3}>
                                        <MaterialIcons icon="help" size="small"/>
                                    </Col>
                                    <Col xs={3}>
                                        <MaterialIcons onClick={this.handlePrivacyPolicy} icon="phonelink_lock" size="small"/>
                                    </Col>
                                    <Col xs={3}>
                                        <MaterialIcons onClick={this.handleTermsUsage} icon="ballot" size="small"/>
                                    </Col>
                                </Row>
                              </center>
                            </Col>
                          </Row>
                        </MediaQuery>

                </Navbar>

                <Modal style={{width:"80vw !important", fontSize:"75%"}} show={this.state.contactUs_Show} onHide={this.handleContactUs}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Us</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th>Gauresh</th>
                                <th><a href="tel:+919769771203">+91 9769771203</a></th>
                                <th><a href="mailto:gaureshkhanolkar11@gmail.com">gaureshkhanolkar11@gmail.com</a></th>
                            </tr>
                            <tr>
                                <th>2</th>
                                <th>Rajib Jena</th>
                                <th><a href="tel:+919890500022">+91 9890500022</a></th>
                                <th><a href="mailto:jenarajibkumar@gmail.com">jenarajibkumar@gmail.com</a></th>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                </Modal>

                <Modal style={{width:"80vw !important", fontSize:"75%"}} show={this.state.developerTeam_Show} onHide={this.handleDeveloperTeam}>
                <Modal.Header closeButton>
                    <Modal.Title>Developed by</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <hr/>
                      <div>
                        <center>
                          <h6><b>MONIK RAJ BEHERA</b></h6>
                        </center>
                        <center>
                          <b>LinkedIn:</b> <a href="https://www.linkedin.com/in/bmonikraj" target="_blank" style={{color: "grey"}}>https://linkedin.com/in/bmonikraj</a>
                        </center>
                      </div>
                    <hr/>
                      <div>
                        <center>
                          <h6><b>AJIT KUMAR BEHERA</b></h6>
                        </center>
                        <center>
                          <b>LinkedIn:</b> <a href="https://www.linkedin.com/in/ajit-kumar-behera-37a560162/" target="_blank" style={{color: "grey"}}>https://www.linkedin.com/in/ajit-kumar-behera-37a560162/</a>
                        </center>
                      </div>
                    <hr/>
                </Modal.Body>
                </Modal>


                <Modal size="lg" show={this.state.privacyPolicy_Show} onHide={this.handlePrivacyPolicy}>
                <Modal.Header closeButton>
                    <Modal.Title>Privacy Policy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{fontSize:"85%"}}>
                        <div><p style={{fontSize:"75%", textAlign:"center", fontStyle:"italic"}}>Last Updated on [ 1 April 2019 ]</p></div>
                        <br/>
                        <div style={{textAlign:"justify"}}>
                            <h6>I. INTRODUCTION</h6>
                            <p>NITRAA - PUNE - PUNE("Company" or "We") respects your privacy and is committed to protecting it through our compliance with this policy.</p>

                            <p>This Privacy Policy (“Policy”) describes the types of information we may collect from you or that you may provide when you use NITRAA - PUNE-PUNE’s website, services, and application (collectively “Services”) and our practices for collecting, using, maintaining, protecting, and disclosing that information. This Policy does not apply to information collected by any third party, including through any application or content (including advertising) that may link to or be accessible from or on NITRAA’s Services.</p>

                            <p>Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Services. By accessing or using NITRAA - PUNE-PUNE’s Services, you agree to this Policy. This Policy may change from time to time (see Changes to our Privacy Policy). You will be provided notice of this change, and continuing to use the Services after receiving notice will constitute acceptance of the changes.</p>
                        </div>
                        <div style={{textAlign:"justify"}}>
                            <h6>II. TERMS</h6>
                            <ol>
                                <li><u>Information We Collect About You.</u> NITRAA - PUNE - PUNE' collects several types of information. Such information is utilized in providing an efficient and effective experience to all users. When we provide the Services to you, your data is stored on our computers and servers. In some cases, the data may be accessible to people involved with the operation of the site (administration, sales, marketing, legal, system administration) or external parties (such as third party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, as necessary, as Data Processors by us. NITRAA - PUNE - PUNE collects the following information:</li>
                                <ul>
                                    <li>Personal Information, which includes information through which you may be personally identified, such as name, postal addresses, email addresses, IP address, social media website user account names, telephone numbers, companies you may be associated with, education, employment history, or other addresses at which you receive communications from or on behalf of NITRAA - PUNE - PUNE ("Personal Information")</li>
                                    <li>Non-Personal Information, which includes information that alone cannot be used to identify or contact you. Such Non-Personal Information may include, but is not limited to; browser information and details; operating system information; mobile device information; pages accessed; times of visit; and referring websites, applications, or services, including the relevant search queries that led you to our Services (“Non-Personal Information”)</li>
                                    <li>Collectively, Personal Information and Non-Personal Information shall be referred to as “Information.”</li>
                                </ul>
                                <li><u>Method of Collecting Information.</u>NITRAA - PUNE - PUNE collects Information in two ways: (1) Information you provide directly; and (2) Information we receive from your use of our Services.</li>
                                <ul>
                                    <li>Information is collected when you:</li>
                                    <ul>
                                        <li>Send NITRAA - PUNE - PUNE any electronic communication (including via email or any other application)</li>
                                        <li>Enter contests run by us from time-to-time</li>
                                        <li>Create a user account</li>
                                        <li>Connect other online accounts with your NITRAA - PUNE - PUNE account, such as Facebook or LinkedIn</li>
                                        <li>Submit online applications and forms to NITRAA - PUNE - PUNE, and</li>
                                        <li>Subscribe to newsletters.</li>
                                    </ul>
                                    If you use a social media platform or your mobile device (or other methods of communication) to interact with NITRAA - PUNE - PUNE, the communication method or application may have a specific and independent privacy policy that governs the use of Personal Information.
                                </ul>
                                <li><u>Information Automatically Collected</u> When you use our Services, we may collect certain information as described below to improve our Services, troubleshoot bugs, provide the Services, manage the Services, track usage, and provide content for referring traffic sources. Such information may include: IP address; profile information; aggregate user data; preferences; technical session information; browser type; information about your computer, hardware, software, or mobile device, including a device identifier; demographic information including zip code; and navigational data including log files, server logs, clickstream data, and language preference. User IP addresses are recorded for security and monitoring and for providing services. If you arrived at our website via a link from another webpage, we may receive aggregate or otherwise anonymous statistical information about your visit to our site. We monitor customer traffic patterns and site usage to help us develop the design of the site, and to improve the content of our website to better match the interests of our website users. We may combine this automatically collected and other Non-Personal Information with Personal Information, in which case we will treat the combined information as Personal Information under this Privacy Policy.</li>
                                <li>
                                <u>How We Use Your Information.</u> We use Information collected about you or that you provide to us, including any Personal Information, to:

                                Operate and improve our website and Services;
                                Provide Services to you;
                                Track and analyze your use of our Services;
                                Provide customer support, including support to our vendors or business partners;
                                Communicate and provide additional information that may be of interest to you about NITRAA - PUNE - PUNE, our merchants, and our business partners, such as news, offers and coupons, announcements, and other relevant materials;
                                Send you reminders, notices, updates, security alerts, support and administrative messages, service bulletins, or marketing materials;
                                Administer contests or any promotional activities or events sponsored by us;
                                Manage our everyday business needs, such as website administration, fulfillment of orders, analytics, fraud detection and prevention, compliance with the law or reporting obligation, or enforcement of our Terms of Service; and
                                Aggregate anonymous data from our Services used to benchmark, analyze, and improve the Services.
                                If you do not want to be on our mailing list, you can opt out anytime by sending an email to info@NITRAA - PUNE.org or clicking on the "unsubscribe" button on our communications. From time to time, we may use your Personal Information to send important notices to you regarding material changes to our terms, conditions, and policies or purchased services which you may not opt out of receiving.
                                </li>
                                <li><u>Disclosure of Your Information</u> We may disclose Personal Information that we collect or you provide as described in this Policy:

                                To our service providers, which provide services for us including but not limited to sending emails on our behalf, processing payments, providing analytics services and helping us provide services as requested by users. Our service providers are bound by law or contract to protect Personal Information and are only allowed to use Personal Information in accordance with the terms of our service agreements with them. We do NOT share, sell, rent, or trade Personal Information with third parties for their own promotional purposes, and we will only share Personal Information as outlined herein or with your consent.
                                We may also disclose your Personal Information: (1) To comply with any court order, law, or legal process, including to respond to any government or regulatory request; (2) To enforce or apply our Terms of Services and other agreements, including for billing and collection purposes; and (3) If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of NITRAA - PUNE, our customers, or others. This includes exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction.
                                </li>
                                <li><u>Accessing and Correcting Your Information</u> You have the right to know whether your Personal Information has been stored and can consult with NITRAA - PUNE - PUNE about any Personal Information to verify the accuracy of such Information and receive a copy thereof. You have the right to have the Information supplemented, erased, updated, or corrected. For its transformation into anonymous format or to block any data held in violation of the law, requests should be sent to us by email at info@NITRAA - PUNE.org. We will retain your information for as long as your account is active or as needed to provide you Services, conduct our internal operations, and to maintain a record of your transactions for financial reporting purposes. All Information will also be retained and used, as necessary, to comply with our legal obligations, resolve disputes, and enforce our agreements.</li>
                                <li><u>Data Security.</u>The security of your Personal Information is important to NITRAA - PUNE. We have implemented reasonable administrative, technical, and physical security measures designed to secure and protect your Information from accidental loss and from unauthorized access, use, alteration, and disclosure. HOWEVER, as the transmission of information via the internet is not completely secure, we cannot guarantee the security of information transmitted to our Services. Any transmission of Personal Information is at your own risk.</li>
                                <li><u>Children’s Personal Information.</u> We do not knowingly collect or solicit Personal Information from anyone under the age of 16. If you are under 16, please do not attempt to register for the Services or send any Information about yourself to us. Parents and legal guardians are encouraged to monitor the activities of their wards in this regard. If we learn that we have collected Information from a child under age 16, we will delete that Information as quickly as possible. If you believe that a child under 16 may have provided us Information, please contact us</li>
                                <li><u>Changes to our Privacy Policy</u> NITRAA - PUNE - PUNE reserves the right to update this Policy from time to time. NITRAA - PUNE will notify you of any changes and/or modifications to the Policy by updating the “Last Modified” date on this Policy, sending an electronic communication detailing the changes, posting a notification on the Services, or as required by law. Any changes or modifications will be effective immediately upon posting the updated Policy on NITRAA - PUNE-PUNE’s Services. You are encouraged to periodically review this Policy to stay informed of updates. Your continued use of NITRAA - PUNE-PUNE’s Services after receipt of such revised Policy will be deemed an acceptance of the revised Policy.</li>
                            </ol>
                            <h6>III. CONTACT US</h6>
                            <p>To ask questions or comment about this Privacy Policy and our privacy practices, contact us at the information provided in 'Contact Us' tab</p>
                        </div>
                    </div>
                </Modal.Body>
                </Modal>


                <Modal size="lg" show={this.state.termsUsage_Show} onHide={this.handleTermsUsage}>
                <Modal.Header closeButton>
                    <Modal.Title>Terms of Usage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="terms-of-use-page" class="row-container">
                        <div id="terms-of-use-header">
                                        <div><p style={{fontSize:"75%", textAlign:"center", fontStyle:"italic"}}>Last Updated on [ 1 April 2019 ]</p></div>
                                        <br/>
                        </div>

                        <div id="terms-of-use-body">
                            <p class="section">By using the NITRAA - PUNE alumni website you agree to be bound by the
                                following terms and conditions ("Terms of Use"). This agreement is personal to you; it cannot be
                                assigned or transferred. If any provision of this agreement is invalid or unenforceable under applicable
                                law, the remaining provisions will continue in full force and effect.
                            </p>
                            <ol class="list">
                                <li>
                                    <span class="sub-heading">Your Acceptance</span>
                                    <p class="list-heading">By using and/or visiting the NITRAA - PUNE alumni Website
                                        you signify your agreement to:
                                    </p>
                                    <ol class="list">
                                        <li>These terms and conditions (the "Terms of Use"); and</li>
                                        <li>The NITRAA - PUNE privacy policy, which is incorporated here by reference.
                                        </li>
                                    </ol>
                                    <p class="list-heading">
                                        If you do not agree to any of these terms, or the privacy policy, please do not use this
                                        Website. Nothing in this Agreement shall be deemed to confer any third-party rights or benefits.
                                    </p>
                                </li>

                                <li>
                                    <span class="sub-heading">Website</span>
                                    <p class="list-text-item">These Terms of Use apply to all users of the Website, including users who
                                        are contributors of content and other materials or services on the Website. The term Website
                                        shall be understood to include all aspects and services of the NITRAA - PUNE
                                        alumni Website, including but not limited to all products, software and services offered via any
                                        website such as the blogs, groups, clubs, directories, discussion boards, job boards, mentor
                                        platforms, messaging, social and professional networking, photo and video uploading, commenting,
                                        mailing lists, and other applications.</p>
                                    <p class="list-text-item">The Website electronically publishes news and information that may include
                                        facts, views, opinions and recommendations of individuals and organizations deemed of interest
                                        to alumni. NITRAA - PUNE does not review, monitor, verify or guarantee the
                                        accuracy, completeness or timeliness of or otherwise endorse information provided by any
                                        organization or individual, give advice or advocate the purchase or sale of any product or
                                        service not directly offered by NITRAA - PUNE or its affiliates.</p>
                                    <p class="list-text-item">The Website may include unmoderated forums containing the personal
                                        opinions and other expressions of the persons who post entries on a wide range of topics. The
                                        text and other materials on these Website are the opinion of the specific author and are not
                                        statements of advice, opinion, or information of NITRAA - PUNE.</p>
                                    <p class="list-text-item">The Website may contain links to third-party websites that are not owned
                                        by, affiliated with or controlled
                                        by NITRAA - PUNE. NITRAA - PUNE has no control over, and assumes
                                        no responsibility for, the content, privacy policies, or practices of any third-party websites
                                        not directly affiliated with NITRAA - PUNE. In addition, the Website will not
                                        and cannot censor or edit the content of any non-affiliated third-party site. By using the
                                        Website, you expressly release NITRAA - PUNE from any and all liability arising
                                        from your use of any third-party website.</p>
                                </li>
                                <li>
                                    <span class="sub-heading">Your Account</span>
                                    <p class="list-text-item">In order to access some features of the Website, you will have to create
                                        an account. By creating an account you agree to these Terms of Use and thereby agree to use of
                                        the Website in a manner consistent with all applicable laws and regulations and in accordance
                                        with the terms and conditions set out in the policies and guidelines outlined here. Please note
                                        that you will be referred to as "User" from time to time in this Agreement. You may never use
                                        another's account. Your User account may not be shared, transferred, or sold to other parties.
                                        When creating your account, you must provide accurate and complete information. You are solely
                                        responsible for the activity that occurs on your account, and you must keep your account
                                        password secure. You must notify NITRAA - PUNE immediately of any breach of
                                        security or unauthorized use of your account. Although NITRAA - PUNE will not be
                                        liable for your losses caused by any unauthorized use of your account, you may be liable for the
                                        losses of NITRAA - PUNE or others due to such unauthorized use.</p>
                                </li>
                                <li>
                                    <span class="sub-heading">Rules for Online Conduct</span>
                                    <p class="list-text-item">You agree to use the Website in accordance with all applicable laws.
                                        Because NITRAA - PUNE is a nonprofit, tax-exempt organization, you agree that
                                        you will not use the Website for organized partisan political activities or commercial
                                        purposes. You further agree that you will use all of the services or information provided on
                                        the Website in accordance with the rules of conduct set forth below. This includes interactions
                                        with other users by email, web post, postal mail, or phone.</p>

                                    <span class="sub-heading">Prohibited conduct:</span>
                                    <ol class="list">
                                        <li>Posting content that defames or threatens others</li>
                                        <li>Posting statements that are bigoted, hateful or racially offensive</li>
                                        <li>Posting content that infringes another's intellectual property, including, but not limited
                                            to, copyrights, trademarks or trade secrets. When quoting copyrighted material, please
                                            adhere to the Electronic Frontier Foundation's Fair Use Guidelines
                                        </li>
                                        <li>Posting material that contains obscene language or images</li>
                                        <li>Advertising or any form of commercial solicitation</li>
                                    </ol>
                                    <p class="list-text-item">Statements or postings that violate the above terms will be deleted from
                                        the Website upon discovery. Copyrighted material, including without limitation software,
                                        graphics, text, photographs, sound, video and musical recordings, may not be placed on the
                                        Website without the express permission of the owner of the copyright of the material, or other
                                        legal entitlement to use the material. Any person posting material protected by copyright for
                                        the benefit of any third-party represents and warrants consent or permission has been obtained
                                        to post such materials. Although NITRAA - PUNE does not screen or monitor
                                        content posted by users to the Website, NITRAA - PUNE reserves the right to
                                        remove content that violates the above rules of which it becomes aware.</p>
                                    <p class="list-text-item">You may not attempt to use or distribute tools designed for compromising
                                        security or take any action to compromise the security of this site. Examples of these tools
                                        include but are not limited to password guessing programs, cracking tools or network probing
                                        tools. You may not "flood" or disrupt the Website through any means or process.</p>

                                    <p class="list-text-item">You may not copy, scrape, download, export or otherwise capture any data
                                        obtained in the Website, e.g., the alumni directory, and/or store it outside of the system,
                                        e.g., in a separate spreadsheet, email list, database or other external repository without the
                                        permission of NITRAA - PUNE. NITRAA - PUNE may grant permission
                                        by configuring User accounts to allow such activities.</p>
                                    <p class="list-text-item">You agree that you will not access or attempt to access any other user's
                                        account, or misrepresent or attempt to misrepresent your identity while using the Website.</p>
                                </li>
                                <li>
                                    <span class="sub-heading">Online Communication Services</span>
                                    <p>Communication services provided through the Website, such as the directory, online communities,
                                        discussion boards, blogs, messaging, social and professional networking, and other services in
                                        the future, are a part of the Website designed for communication between
                                        Users. NITRAA - PUNE will not monitor these communications, but reserves the
                                        right to take action against any User who defames or harasses another User through any of the
                                        services offered through the Website, if it comes to NITRAA - PUNE's
                                        attention.</p>
                                </li>
                                <li>
                                    <span class="sub-heading">Online Alumni Communities</span>
                                    <p class="list-text-item">NITRAA - PUNE provides a platform on which alumni can
                                        create and join online alumni communities based on shared interests or experiences. Participants
                                        in online alumni communities may not represent or imply that their opinions represent those
                                        of NITRAA - PUNE. NITRAA - PUNE reserves the right to remove all
                                        or any portion of an online alumni community’s information from the platform at any time and
                                        at NITRAA’s sole discretion. All online alumni community participants and
                                        organizers agree not to post or facilitate the posting of any material in violation of these
                                        Terms of Use. Online alumni community participants and organizers also agree to provide
                                        reasonable assistance at the request of NITRAA - PUNE and its representatives to
                                        address any violations of this policy as determined by NITRAA - PUNE.
                                        Participants and organizers also agree not to use the online alumni community for any activity
                                        that violates any federal, state or local law.</p>
                                </li>
                                <li>
                                    <span class="sub-heading">Disclaimer of Warranty / Limitation of Liability</span>

                                    <p class="list-text-item">NITRAA - PUNE does not warrant that the Website will
                                        operate in an uninterrupted or error-free manner or that the Website is free of viruses or other
                                        harmful components. Use of information obtained from or through these Website is at your own
                                        risk.</p>

                                    <p class="list-text-item">YOU AGREE THAT NITRAA - PUNE WILL NOT BE LIABLE TO YOU FOR
                                        ANY LOSS OR DAMAGES, EITHER ACTUAL OR CONSEQUENTIAL, ARISING OUT OF OR RELATING TO THESE TERMS
                                        OF USE, OR TO YOUR (OR ANY THIRD PARTY'S) USE OR INABILITY TO USE THE WEBSITE, OR TO YOUR
                                        PLACEMENT OF CONTENT ON THE WEBSITE, OR TO YOUR RELIANCE UPON INFORMATION OBTAINED FROM OR
                                        THROUGH THE WEBSITE. IN PARTICULAR, NITRAA - PUNE WILL HAVE NO LIABILITY FOR ANY
                                        DIRECT, INDIRECT, CONSEQUENTIAL, PUNITIVE, SPECIAL OR INCIDENTAL DAMAGES, WHETHER FORESEEABLE OR
                                        UNFORESEEABLE, (INCLUDING, BUT NOT LIMITED TO, CLAIMS FOR DEFAMATION, ERRORS, MISUSE OF EMAIL OR
                                        OTHER SERVICES, LOSS OF DATA, OR INTERRUPTION IN AVAILABILITY OF DATA), ARISING OUT OF OR
                                        RELATING TO THESE TERMS, YOUR USE OF OR INABILITY TO USE A WEBSITE, OR ANY PURCHASES ON THE
                                        WEBSITE, OR YOUR PLACEMENT OF CONTENT ON A WEBSITE, OR YOUR RELIANCE UPON INFORMATION OBTAINED
                                        FROM OR THROUGH A WEBSITE, WHETHER BASED IN CONTRACT, TORT, STATUTORY OR OTHER LAW, EXCEPT ONLY
                                        TO THE EXTENT THAT APPLICABLE LAW REQUIRES SUCH LIABILITY.</p>
                                    <p class="list-text-item">NITRAA - PUNE makes no representation regarding your
                                        ability to transmit and receive information from or through the Website and you agree and
                                        acknowledge that your ability to access the Website may be
                                        impaired. NITRAA - PUNE disclaims any and all liability resulting from or
                                        related to such events.</p>
                                </li>
                                <li>
                                    <span class="sub-heading">Choice of Law/Forum Selection</span>
                                    <p class="list-text-item">All matters relating to the Website and these Terms of Use and any dispute
                                        or claim arising therefrom or related thereto (in each case, including non-contractual disputes
                                        or claims), shall be governed by and construed in accordance with the internal laws of the State
                                        of California without giving effect to any choice or conflict of law provision or rule.</p>
                                    <p class="list-text-item">Any legal suit, action or proceeding arising out of, or related to, these
                                        Terms of Use or the Website shall be instituted exclusively in the federal courts of the United
                                        States or the courts of the State of California located in the county of San Francisco. You
                                        waive any and all objections to the exercise of jurisdiction over you by such courts and to
                                        venue in such courts.</p>
                                </li>
                                <li>
                                    <span class="sub-heading">Notice</span>
                                    <p class="list-text-item">NITRAA - PUNE reserves the right to update this Terms of
                                        Use from time to time. NITRAA - PUNE will notify you of any changes and/or
                                        modifications by updating the “Last Modified” date on this page, sending an electronic
                                        communication detailing the changes, posting a notification on the Services, or as required by
                                        law. Any changes or modifications will be effective immediately upon posting the update
                                        on NITRAA’s Services. You are encouraged to periodically review these
                                        Terms of Use to stay informed of updates. Your continued use of NITRAA’s
                                        Services after receipt of such revised Terms of Use will be deemed an acceptance of the
                                        changes.</p>
                                </li>
                                <li>
                                    <span class="sub-heading">Termination of Service</span>
                                    <p class="list-text-item">User may terminate this Agreement by cancelling his or her account. To do
                                        this the user must contact NITRAA - PUNE through phone or mail as listed
                                        below.</p>
                                    <p class="list-text-item">NITRAA - PUNE may terminate your account or access rights
                                        to the Website at any time, without notice, for conduct that NITRAA - PUNE
                                        believes violates this Agreement or other policies or guidelines
                                        that NITRAA - PUNE has posted. NITRAA - PUNE may terminate your
                                        account or your access rights to the Website for online conduct
                                        that NITRAA - PUNE believes is harmful to other Users,
                                        to NITRAA - PUNE's business, or to other information providers.</p>
                                </li>
                                <li>
                                    <span class="sub-heading">Trademarks</span>
                                    <p class="list-text-item">The logo, name and all graphics on the Website or its affiliates are
                                        trademarks of NITRAA - PUNE or its affiliates. You must not use, reproduce,
                                        copy, or redistribute such marks without the prior written permission
                                        of NITRAA - PUNE or its affiliates. All other trademarks or service marks
                                        appearing on the Website are the marks of their respective owners.</p>
                                </li>
                                <li>
                                    <span class="sub-heading">Indemnification</span>
                                    <p class="list-text-item">You agree to defend, indemnify and hold NITRAA - PUNE, its
                                        trustees, officers, employees and agents harmless from any claims, losses or damages, including
                                        legal fees, resulting from your violation of these Terms of Use, your use of the Website or your
                                        placement of any content onto the Website, and to fully cooperate
                                        in NITRAA - PUNE's defense against any such claims.</p>
                                </li>
                                <li>
                                    <span class="sub-heading">Copyright License & Complaints</span>
                                    <p class="list-text-item">Owners of posted materials grants NITRAA - PUNE a
                                        non-exclusive, royalty-free, perpetual license to reproduce and distribute any content posted on
                                        the Website.</p>
                                    <p class="list-text-item">NITRAA - PUNE respects the intellectual property rights of
                                        others and complies with the Digital Millennium Copyright Act (DMCA). If you believe your
                                        copyright has been violated on the Website, please provide the following information:</p>
                                    <ol class="list">
                                        <li>The name, address, and physical or electronic signature of the complaining party</li>
                                        <li>Identification of the infringing materials and their Internet location, or if the service
                                            provider is an "information location tool" such as a search engine, the reference or link to
                                            the infringing materials
                                        </li>
                                        <li>Sufficient information to identify the copyrighted works</li>
                                        <li>A statement by the copyright holder of a good faith belief that there is no legal basis for
                                            the use complained of
                                        </li>
                                        <li>A statement of the accuracy of the notice and, under penalty of perjury, that the
                                            complaining party is authorized to act on the behalf of the copyright holder
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <span class="sub-heading">Entire Agreement</span>
                                    <p class="list-text-item">The Terms of Use and our Privacy Policy constitute the sole and entire
                                        agreement between you and NITRAA - PUNE with respect to the Website and
                                        supersede all prior and contemporaneous understandings, agreements, representations and
                                        warranties, both written and oral, with respect to the Website. </p>
                                </li>
                                <li>
                                    <span class="sub-heading">Contact Information</span>
                                    <p class="list-text-item">To ask questions or comment about this Terms of Use, contact us at 'Contact us' tab.
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default Footer;
