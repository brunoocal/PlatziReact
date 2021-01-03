import React from 'react';

import confLogo from '../images/badge-header.svg';
import '../styles/Badge.css';

class Badge extends React.Component {
    render() {
        const {firstName, lastName, jobTitle, twitter, avatar} = this.props;
        
        return (
            <div className="Badge">
                <header className="Badge__header">
                    <img src={confLogo} alt="Logo de la conf"/>
                </header>

                <div className="Badge__section-name">
                    <img className="Badge__avatar" src={avatar} alt="Avatar"/>
                    <h1> {firstName}<br/> {lastName}</h1>
                </div>

                <div className="Badge__section-info">
                    <h3>{jobTitle}</h3>
                    <div>@{twitter}</div>
                </div>

                <div className="Badge__footer">
                    #platziconf
                </div>
            </div>
        )
    }
}

export default Badge;