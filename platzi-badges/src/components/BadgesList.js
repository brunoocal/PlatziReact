import React from 'react';

import twitter from '../images/twitter.svg';
import NoAPIDataBadge from './NoAPIDataBadge.js';
import {Link} from 'react-router-dom';
import Gravatar from './Gravatar'
class BadgesList extends React.Component{


    render() {

        const badgesList = this.props.badges.slice(0).reverse();

        return (
            <ul className="list-unstyled">
                {badgesList.map((badge) => {
                    return (
                     <li className="Badges__ul-item" key={badge.id}>
                        <div className="Badges__img-container">
                            <Gravatar className="Badges__img" email={badge.email} />
                        </div>
                        <div className="Badges__info">
                            <h1> {badge.firstName} {badge.lastName}</h1>
                            <div className="Badges__twitter-container">
                                <img className="Badges__twitter-img" src={twitter} alt=""/>
                                <a className="Badges__twitter-name" href={'https://www.twitter.com/' + badge.twitter}>@{badge.twitter}</a>
                            </div>
                            <p className="Badges__info-desc">{badge.jobTitle}</p>
                        </div>
                     </li>
                    )
                 })}
            </ul>

            
        )
    }
    
}

export default BadgesList