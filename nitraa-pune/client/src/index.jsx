import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './AppRoute';
const root = document.getElementById("root");

ReactDOM.render(
    <BrowserRouter>
        <AppRoute/>
    </BrowserRouter>
    ,root);