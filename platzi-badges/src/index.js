import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './global.css';

import Badge from './components/Badge'

const container = document.getElementById('app');

// ReactDOM.render(__qué__, __dónde__);
ReactDOM.render(<Badge 
    firstName="Brunooh" 
    lastName="Cal" 
    jobTitle="Frontend Student" 
    twitter="Brunoocal"
    avatar="https://s.gravatar.com/avatar/01c1f19f59da0fd807e885cd60958f53?s=80"
    />, container);
