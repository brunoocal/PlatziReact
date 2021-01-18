import React from 'react';

function Loader(){
    return (
        <React.Fragment>
            <div className="Loader">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </React.Fragment>
    );
}

export default Loader;