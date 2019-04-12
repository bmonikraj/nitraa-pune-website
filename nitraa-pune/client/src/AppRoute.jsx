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
            </React.Fragment>
        )
    }
}

export default App;
