import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Bolo from './Bolo';
import { Route } from 'react-router-dom';
import Login from './Login';

class App extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Route exact={true} path='/' component={Home} />
                <Route exact={true} path='/bolo' component={Bolo} />
                <Route exact={true} path='/login' component={Login} />
            </React.Fragment>
        )
    }
}

export default App;