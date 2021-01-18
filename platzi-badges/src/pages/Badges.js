import React from 'react';
import Loader from '../components/Loader.js';
import BadgesList from '../components/BadgesList.js';
import NoAPIDataBadge from '../components/NoAPIDataBadge'
import logo from '../images/badge-header.svg';
import Error from '../components/Error.js'
import {Link} from 'react-router-dom'
import api from '../api.js'
import './styles/Badges.css';
import './styles/Loader.css';
class Badges extends React.Component {

        state = {
            data: undefined,
            loading: true,
            error: null
        }

        componentDidMount(){
            this.fetchData();
        }

        async fetchData(){
            this.setState({
                loading: true,
                error: null
            })

            try{
                const data = await api.badges.list();
                this.setState({
                    loading: false,
                    data
                })
            }catch(err){
                this.setState({
                    error: err,
                    loading: false
                })
            }
            

            
        }

    render() {

        if(this.state.error){
            return (
                <Error error={this.state.error}/>
            )
        }

        if(this.state.loading === true){
            return (
                <Loader/>
            );
        }

        return (
            <React.Fragment>
                <div className="Badges">
                    <div className="Badges__hero">
                        <div className="Badges__container">
                            <img src={logo} alt="Logo" className="Badges_conf-logo"/>
                        </div>
                    </div>
                    
                    {this.state.data.length >=1 && (
                        <div className="Badges__container">
                            <div className="Badges__buttons">
                                <Link className="btn btn-primary" to="/badges/new">New Badge</Link>
                            </div>
                    </div>
                    )}
                    

                </div>


                {this.state.data.length <= 0 && (<NoAPIDataBadge/>)}

                {
                    this.state.data.length >= 1 && (
                        <div className="Badges__list">
                            <div className="Badges__container">
                            {<BadgesList badges={this.state.data}/>}
                            </div>
                        </div>
                    )
                }

            </React.Fragment>
        )
    }

}

export default Badges;