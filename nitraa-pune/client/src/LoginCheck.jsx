import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import queryString from 'query-string';

class LoginCheck extends React.Component{
    componentDidMount(){
        var params = queryString.parse(this.props.location.search);
        console.log(params);
        if(!params.id)
        {
            window.open("/login?status=fail&message=Access%20Failed", "_self");
        }
        else
        {
            axios({
                method: 'get',
                url: '/loginCheck',
                headers: { 
                    "uid":params.id 
                },
            })
            .then(function(response){
                if(response.data.status == "success")
                {
                    localStorage.setItem('authtoken', response.headers.authtoken);
                    localStorage.setItem('profile', 'user');
                    window.open("/", "_self");
                }
                else
                {
                    window.open("/login?status=fail&message=Login%failed%due%20to%20error", "_self");
                }
            })
            .catch(function(error){
                console.log(error);
                window.open("/login?status=fail&message=Error%20occured%20while%20logging%20in", "_self");
            })
        }
    }

    render(){
        return(<div></div>);
    }


}

export default LoginCheck;