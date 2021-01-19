import React from 'react';

import confLogo from '../images/badge-header.svg';
import twitterImg from '../images/twitter.svg'
import '../styles/Badge.css';
import Gravatar from './Gravatar'

class Badge extends React.Component {
    render() {
        const {firstName, lastName, jobTitle, twitter, email} = this.props;

        return (
            <div className="Badge">
                <header className="Badge__header">
                    <img src={confLogo} alt="Logo de la conf"/>
                </header>

                <div className="Badge__section-name">
                    <Gravatar className="Badge__avatar" email={email}/>
                    <h1> {firstName}<br/> {lastName}</h1>
                </div>

                <div className="Badge__section-info">
                    <h3>{jobTitle}</h3>
                    <div className="Badges__twitter-container">
                        <img className="Badges__twitter-img" src={twitterImg} alt=""/>
                        <a className="Badges__twitter-name" href={'https://www.twitter.com/' + twitter}>@{twitter}</a>
                    </div>
                </div>

                <div className="Badge__footer">
                    #platziconf
                </div>
            </div>
        )
    }
}

export default Badge;