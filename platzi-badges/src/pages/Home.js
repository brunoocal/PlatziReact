import React from 'react';

import './styles/Home.css'
import {Link} from 'react-router-dom'
import astronauts from '../images/astronauts.svg'
import platziconf from '../images/platziconf-logo.svg'

function Home(){
    return (
        <>
        <div className="Home__container">
            <div className="Home__grid">
                <div className="Home__info">
                    <img src={platziconf} alt="Platzi Conf logo"/>
                    <h1>PRINT YOUR BADGES</h1>
                    <p>The easiest way to manage your conference</p>
                    <Link className="btn btn-primary Home__button" to="/badges">Start now</Link>
                </div>
                <div className="Home__astronauts">
                    <img src={astronauts} alt="Astronauts photo"/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Home;