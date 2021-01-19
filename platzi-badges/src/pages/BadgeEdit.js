import React from 'react';

import './styles/BadgeEdit.css'
import Badge from '../components/Badge'
import BadgeFormEdit from '../components/BadgeFormEdit'
import header from '../images/platziconf-logo.svg'
import api from '../api';

class BadgeEdit extends React.Component{
    state = {
        loading: true,
        error: undefined,
        form: {
            firstName: '',
            lastName: '',
            email: '',
            jobTitle: '',
            twitter: ''
        },
        //Añadimos valores para pasar por props por default
        progressBar: {
            firstName: '',
            lastName: '',
            email: '',
            jobTitle: '',
            twitter: '',
            async_api: ''
        }
    };

    componentDidMount(){
        this.fetchData();
    }

    fetchData = async e => {
        this.setState({loading: true, error: null})

        try{
            const data = await api.badges.read(
                this.props.match.params.badgeId
            )

            this.setState({loading: false, form: data})
        }catch(err){

        }
    }

    handleChange = e => {
        this.setState({
            form: {
                ... this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="BadgeEdit__hero">
                    <img className="img-fluid" src={header} alt="logo"/>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Badge 
                            firstName={this.state.form.firstName || "FIRST NAME"}
                            lastName={this.state.form.lastName || "LAST NAME"}
                            twitter={this.state.form.twitter || "TWITTER"}
                            jobTitle={this.state.form.jobTitle || "JOB TITLE"}
                            email={this.state.form.email || "EMAIL@EXAMPLE.COM"}/>
                        </div>

                        <div className="col-6 form">
                            <h1>Edit Badge</h1>
                            {/* ARREGLAR BADGEFORMEDIT PROGRESSBAR BUG */}
                            <BadgeFormEdit badgeId={this.props.match.params.badgeId} history={this.props.history} onChange={this.handleChange} formValues={this.state}/>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default BadgeEdit
