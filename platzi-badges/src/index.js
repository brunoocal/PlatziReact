import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './global.css';

import Badge from './components/Badge'
import BadgeNew from './pages/BadgeNew'

const container = document.getElementById('app');

// ReactDOM.render(__qué__, __dónde__);
ReactDOM.render(<BadgeNew />, container);
