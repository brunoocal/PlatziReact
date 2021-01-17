import React from 'react';

import twitter from '../images/twitter.svg';

class BadgesList extends React.Component{

    render() {
        return (
            <ul className="list-unstyled">
                {this.props.badges.results.map((badge) => {
                    return (
                     <li className="Badges__ul-item" key={badge.id}>
                        <div className="Badges__img-container">
                            <img className="Badges__img" src={badge.image} alt="Avatar de la persona"/>
                        </div>
                        <div className="Badges__info">
                            <h1> {badge.name}</h1>
                            <div className="Badges__twitter-container">
                                <img className="Badges__twitter-img" src={twitter} alt=""/>
                                <a className="Badges__twitter-name" href={'https://www.twitter.com/' + badge.name}>@{badge.name}</a>
                            </div>
                            <p className="Badges__info-desc">{badge.origin.name}</p>
                        </div>
                     </li>
                    )
                 })}
            </ul>

            
        )
    }
    
}

export default BadgesList