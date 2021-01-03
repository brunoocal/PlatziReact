import React from 'react';

import './styles/BadgeNew.css'
import Badge from '../components/Badge'
import Navbar from '../components/Navbar'
import BadgeForm from '../components/BadgeForm'
import header from '../images/badge-header.svg'

class BadgeNew extends React.Component{
    render() {
        return (
            <div>
                <Navbar/>
                <div className="BadgeNew__hero">
                    <img className="img-fluid" src={header} alt="logo"/>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Badge 
                            firstName="Brunooh" 
                            lastName="Cal" 
                            jobTitle="Frontend Student" 
                            twitter="Brunoocal"
                            avatar="https://s.gravatar.com/avatar/01c1f19f59da0fd807e885cd60958f53?s=80"/>
                        </div>

                        <div className="col-6">
                            <BadgeForm />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default BadgeNew
