/*var request = require('request');
request.get('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81t0ft6r3y65w6&redirect_uri=https://youtube.com&scope=r_basicprofile', function (error, response, body) {

    //user is redirected to the linkedin auth page. After a successfull or failure of authentication, linkedin redirects us to the redirect uri(here youtube) with a code attched to its url. e.g https://youtube.com/?code="abcdefg...etc"

    //THIS PART OF REQUEST SHOULD BE DONE IN FRONTEND


});*/
var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');
var code = req.body.linkedin_code; //to be fetched from front end
var post_data = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'https: //www.youtube.com', //same as provided in the request initiation
    client_id: '81t0ft6r3y65w6',
    client_secret: 'Olw44tZQ3zMNUdqV'
};
request({
    url: "https://www.linkedin.com/oauth/v2/accessToken",
    method: "POST",
    headers: {
        "content-type": "x-www-form-urlencoded",
    },
    json: true,
    body: post_data,

}, function (error, response, body) {
    console.log(response);
    var accessToken = response.access_token; //length is around of 500 chars
    var expires_in = response.expires_in;
});

//AFTER GETTING THE ACCESS TOKEN, WE CAN USE IT to fetch user data