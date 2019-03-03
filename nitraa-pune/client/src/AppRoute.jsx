import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { Route } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import Gallery from './Gallery';
import ModeratorDashboard from './ModeratorDashboard';

class App extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Route exact={true} path='/' component={Home} />
                <Route exact={true} path='/login' component={Login} />
                <Route exact={true} path='/admin-dashboard' component={AdminDashboard} />
                <Route exact={true} path='/gallery' component={Gallery} />
                <Route exact={true} path='/moderator-dashboard' component={ModeratorDashboard} />
            </React.Fragment>
        )
    }
}

export default App;