import React from 'react';
import Navbar from '../components/Navbar.js';
import BadgesList from '../components/BadgesList.js';
import logo from '../images/badge-header.svg';
import {Link} from 'react-router-dom'
import './styles/Badges.css';
class Badges extends React.Component {

        state = {
            page: 1,
            data: {
                results: []
            },
            loading: true,
            error: null
        }

        constructor(props){
            super(props)
        }

        componentDidMount(){
            this.fetchCharacters();
        }

        async fetchCharacters(){
            this.setState({
                loading: true,
                error: null
            })

            try{
                const response = await fetch(`https://rickandmortyapi.com/api/character?page=${this.state.page}`)
                const data = await response.json();
    
                this.setState({
                    data: {
                        info: data.info,
                        results: [].concat(this.state.data.results, data.results)
                    },
                    loading: false,
                    page: this.state.page + 1
                })
            }catch(err){
                this.setState({
                    error: err,
                    loading: false
                })
            }
            

            
        }

        componentWillUnmount() {
            
        }

    render() {

        if(this.state.error){
            return `Error: ${this.state.error}`
        }

        return (
            <React.Fragment>
                <div className="Badges">
                    <div className="Badges__hero">
                        <div className="Badges__container">
                            <img src={logo} alt="Logo" className="Badges_conf-logo"/>
                        </div>
                    </div>
                    
                    <div className="Badges__container">
                            <div className="Badges__buttons">
                                <Link className="btn btn-primary" to="/badges/new">New Badge</Link>
                            </div>
                        </div>

                </div>


                <div className="Badges__list">
                    <div className="Badges__container">
                        <BadgesList badges={this.state.data}/>
                        {!this.state.loading && (
                        <button className="btn btn-primary loadMore" onClick={() => this.fetchCharacters()}>Cargar más</button>
                        )}
                    </div>

                    

                </div>

            </React.Fragment>
        )
    }

}

export default Badges;