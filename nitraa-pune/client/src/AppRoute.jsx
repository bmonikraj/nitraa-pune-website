import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { Route } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './AdminDashboard';

class App extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Route exact={true} path='/' component={Home} />
                <Route exact={true} path='/login' component={Login} />
                <Route exact={true} path='/admin-dashboard' component={AdminDashboard} />
            </React.Fragment>
        )
    }
}

export default App;