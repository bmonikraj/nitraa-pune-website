import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { Route } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import Gallery from './Gallery';
import ModeratorDashboard from './ModeratorDashboard';
import Register from './Register';
import Profile from './Profile'
import LoginCheck from './LoginCheck';
import EventDisplay from './EventDisplay';
import ModeratorEventHandle from './ModeratorEventHandle';
import JobDetailsFillup from './JobDetailsFillup';
import JobDisplay from './JobDisplay';
import ModeratorJobHandle from './ModeratorJobHandle';
import BlogDisplay from './BlogDisplay';
import ModeratorBlogHandle from './ModeratorBlogHandle';

class App extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Route exact={true} path='/' component={Home} />
                <Route exact={true} path='/login' component={Login} />
                <Route exact={true} path='/register' component={Register} />
                <Route exact={true} path='/admin-dashboard' component={AdminDashboard} />
                <Route exact={true} path='/gallery' component={Gallery} />
                <Route exact={true} path='/moderator-dashboard' component={ModeratorDashboard} />
                <Route exact={true} path='/profile' component={Profile} />
                <Route exact={true} path='/loginCheck' component={LoginCheck} />
                <Route exact={true} path='/events' component={EventDisplay} />
                <Route exact={true} path='/events-moderator' component={ModeratorEventHandle} />
                <Route exact={true} path='/jobs-fillup' component={JobDetailsFillup} />
                <Route exact={true} path='/jobs' component={JobDisplay} />
                <Route exact={true} path='/jobs-moderator' component={ModeratorJobHandle} />
                <Route exact={true} path='/blogs' component={BlogDisplay} />
                <Route exact={true} path='/blogs-moderator' component={ModeratorBlogHandle} />
            </React.Fragment>
        )
    }
}

export default App;
