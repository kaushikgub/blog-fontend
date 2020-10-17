import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import apiClient from '../../services/api'

export default class Navbar extends Component {
    state = {
        redirect: false
    }
    logOut = async () => {
        await apiClient.get('/logout').then(res => {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            this.setState({
                redirect: true
            })
        }).catch(err=>{
            console.log(err.response);
        });
    }
    render() {
        if(this.state.redirect){
            return <Redirect to="/login"></Redirect>
        }
        return (
            <nav className="navbar navbar-dark secondary-color">
                <NavLink className="navbar-brand" to="/">FLY</NavLink>
                <div>
                    <NavLink className="badge badge-pill badge-success mr-2" to="/profiles">Profile</NavLink>
                    <NavLink onClick={this.logOut} className="badge badge-pill badge-danger" to="#">Logout</NavLink>
                </div>
            </nav>
        )
    }
}