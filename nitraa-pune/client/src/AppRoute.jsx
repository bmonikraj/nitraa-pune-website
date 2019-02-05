import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Bolo from './Bolo';
import { Route } from 'react-router-dom';

class App extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Route exact={true} path='/' component={Home} />
            </React.Fragment>
        )
    }
}

export default App;