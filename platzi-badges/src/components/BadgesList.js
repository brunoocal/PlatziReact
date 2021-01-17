import React from 'react';

import twitter from '../images/twitter.svg';

class BadgesList extends React.Component{

    render() {
        return (
            <ul className="list-unstyled">
                {this.props.badges.map((badge) => {
                    return (
                     <li className="Badges__ul-item" key={badge.id}>
                        <div className="Badges__img-container">
                            <img className="Badges__img" src={badge.avatarUrl} alt="Avatar de la persona"/>
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