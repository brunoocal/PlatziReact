import React from 'react';

import confLogo from '../images/badge-header.svg';
import '../styles/Badge.css';

class Badge extends React.Component {
    render() {
        return (
            <div className="Badge">
                <header className="Badge__header">
                    <img src={confLogo} alt="Logo de la conf"/>
                </header>

                <div className="Badge__section-name">
                    <img className="Badge__avatar" src="https://s.gravatar.com/avatar/01c1f19f59da0fd807e885cd60958f53?s=80" alt="Avatar"/>
                    <h1>Bruno <br/> Cal</h1>
                </div>

                <div className="Badge__section-info">
                    <h3>Frontend Student</h3>
                    <div>@brunoocal</div>
                </div>

                <div className="Badge__footer">
                    #platziconf
                </div>
            </div>
        )
    }
}

export default Badge;