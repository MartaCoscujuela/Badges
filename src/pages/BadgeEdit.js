import React from 'react';

import "./styles/BadgeNew.css"
import header from "../images/platziconf-logo.svg"

import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";
import api from '../api';
import PageLoading from '../components/PageLoading';

class BadgeEdit extends React.Component {
    state = { 
        loading: true,
        error: null,
        form: {
            firstName: '',
            lastName: '',
            email: '',
            jobTitle:'Designer',
            twitter: ''
        }
    }

    componentDidMount(){
        this.fetchData()
    }
    
    fetchData = async e => {
        this.setState({loading: true, error: null })

        try {
            const data = await api.badges.read(
                this.props.match.params.badgeId
            )
            console.log(data);
            this.setState({loading: false, form:data})
        } catch (err) {
            this.setState({loading: false, error:err}) 
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

        this.setState({loading: true, error: null})
        try {
            await api.badges.update(this.props.match.params.badgeId, this.state.form)
            this.setState({error: null, loading: false})
            this.props.history.push('/badges')
        } catch (err){
            this.setState({error: err, loading: false})
        }
    }

    render(){
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
                            <h1>Edit Attendant</h1>
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

export default BadgeEdit