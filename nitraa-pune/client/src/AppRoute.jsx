import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { Route } from 'react-router-dom';
import LoginPage from './Login';
import AdminDashboard from './AdminDashboard';
import Gallery from './Gallery';
import ModeratorDashboard from './ModeratorDashboard';
import Register from './Register';
import Profile from './Profile'
import EventDisplay from './EventDisplay';
import EventHandle from './EventHandle';
import JobDetailsFillup from './JobDetailsFillup';
import JobDisplay from './JobDisplay';
import JobHandle from './JobHandle';
import BlogDisplay from './BlogDisplay';
import BlogHandle from './BlogHandle';
import EventEditPane from './EventEditPane';
import BlogEditPane from './BlogEditPane';
import JobEditPane from './JobEditPane';
import EventRegTable from './EventRegTable';

class App extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Route exact={true} path='/' component={Home} />
                <Route exact={true} path='/login' component={LoginPage} />
                <Route exact={true} path='/register' component={Register} />
                <Route exact={true} path='/admin-dashboard' component={AdminDashboard} />
                <Route exact={true} path='/gallery' component={Gallery} />
                <Route exact={true} path='/moderator-dashboard' component={ModeratorDashboard} />
                <Route exact={true} path='/profile' component={Profile} />
                <Route exact={true} path='/eventPage' component={EventDisplay} />
                <Route exact={true} path='/events-list' component={EventHandle} />
                <Route exact={true} path='/event-edit-pane' component={EventEditPane}/>
                <Route exact={true} path='/blog-edit-pane' component={BlogEditPane}/>
                <Route exact={true} path='/job-edit-pane' component={JobEditPane}/>
                <Route exact={true} path='/add-job-details' component={JobDetailsFillup} />
                <Route exact={true} path='/jobPage' component={JobDisplay} />
                <Route exact={true} path='/jobs-list' component={JobHandle} />
                <Route exact={true} path='/blogPage' component={BlogDisplay} />
                <Route exact={true} path='/blogs-list' component={BlogHandle} />
                <Route exact={true} path='/registration-list' component={EventRegTable} />
            </React.Fragment>
        )
    }
}

export default App;
