import React from 'react';

import "./styles/BadgeNew.css"
import header from "../images/platziconf-logo.svg"

import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";
import api from '../api';
import PageLoading from '../components/PageLoading';

class BadgeNew extends React.Component {
    state = { 
        loading: false,
        error: null,
        form: {
            firstName: '',
            lastName: '',
            email: '',
            jobTitle:'Designer',
            twitter: ''
        }
    }
    
    handleChange = e =>{
        this.setState ({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log('submt');
        this.setState({loading: true, error: null})
        console.log(this.state)
        try {
            console.log('try');
            await api.badges.create(this.state.form)
            this.setState({error: null, loading: false})
            this.props.history.push('/badges')
        } catch (err){
            console.log('catch');
            this.setState({error: err, loading: false})
        }
    }

    render(){
        console.log(this.state.loading)
        if (this.state.loading){
            return <PageLoading></PageLoading>
        }
        
        return <>
                    <div className="BadgeNew__hero">
                        <img className="img-fluid BadgeNew__hero-img" src={header} alt="Logo"></img>
                    </div>
                    <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Badge 
                            firstName={this.state.form.firstName || 'first name'} 
                            lastName={this.state.form.lastName || 'last name'}
                            jobTitle={this.state.form.jobTitle || 'job title'}
                            twitter={this.state.form.twitter || 'twitter'} 
                            email={this.state.form.email || 'email'}
                            avatarUrl="https://www.gravatar.com/avatar?d=identicon">                     
                            </Badge>
                        </div>
                        <div className="col-6">
                            <h1>New Attendant</h1>
                            <BadgeForm 
                            onChange={this.handleChange} 
                            error={this.state.error}
                            formValues={this.state.form}
                            onSubmit={this.handleSubmit}/>
                        </div>
                    </div>
                </div>
                </>


        
    }
}

export default BadgeNew