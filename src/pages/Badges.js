import React from 'react'
import './styles/Badges.css'
import confLogo from '../images/badge-header.svg'
import BadgesList from '../components/BadgesList'
import PageLoading from '../components/PageLoading'
import PageError from '../components/PageError'

import {Link} from 'react-router-dom'
import MiniLoader from '../components/MiniLoader'
import api from '../api'

class Badges extends React.Component {


    state = {
        data: undefined,
        loading: true,
        error: null
    }

    componentDidMount (){
        this.fetchData()

        this.interval = setInterval(this.fetchData, 5000)
    }
 
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    fetchData = async () => {
        this.setState({loading: true, error: null})
    
        try {
            const data = await api.badges.list()
            this.setState({loading: false, data: data})
        } catch (error){
            console.log(error);
            this.setState({loading: false, error: error})
        }
    }
    render(){

        if (this.state.loading === true && !this.state.data){
            return <PageLoading></PageLoading>
        }

        if(this.state.error){
           return <PageError error={this.state.error}></PageError>
        }
        return (
            <>
                <div className="Badges">
                    <div className="Badges__hero">
                        <div className="Badges__container">
                            <img className="Badges_conf-logo" alt="logo" src={confLogo}></img>
                        </div>
                    </div>
                </div>

                <div className="Badges__container">
                    <div className="Badges__buttons">
                        <Link to="/badges/new" className="btn btn-primary">
                            New Badge
                        </Link>
                    </div>
                </div>

                <div className="Badge__list">
                    <div className="Badges__container">
                        <BadgesList badges={this.state.data}></BadgesList>
                        {this.state.loading && <MiniLoader></MiniLoader>}
                    </div>
                </div>

            </>
        )
    }
}

export default Badges;