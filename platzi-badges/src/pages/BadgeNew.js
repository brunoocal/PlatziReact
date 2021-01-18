import React from 'react';

import './styles/BadgeNew.css'
import Badge from '../components/Badge'
import Navbar from '../components/Navbar'
import BadgeForm from '../components/BadgeForm'
import header from '../images/platziconf-logo.svg'
import api from '../api'
class BadgeNew extends React.Component{
    state = {
        loading: false,
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
                <div className="BadgeNew__hero">
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
                            <BadgeForm history={this.props.history} onChange={this.handleChange} formValues={this.state}/>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default BadgeNew
