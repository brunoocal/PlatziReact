import React from 'react';
import ReactDOM from 'react-dom';


// const jsx = <h1>Hello, Platzi Badges!</h1>;

// const element = React.createElement('a', 
// {
//     href:'https://platzi.com'
// }, 'Ir a platzi');

const name = "Mark";

// const element = React.createElement('h1', {}, `Hola, soy ${name}`);

// const jsx = <h1>Hola soy, {name}</h1>;

const jsx = (
    <div>
        <h1>Hola soy, {name} </h1>
        <p>Estudiando React</p>
    </div>
);


const container = document.getElementById('app');

// ReactDOM.render(__qué__, __dónde__);
ReactDOM.render(jsx, container);
