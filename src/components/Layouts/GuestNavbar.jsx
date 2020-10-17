import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class GuestNavbar extends Component {
    state = {
        redirect: false
    }
    logOut = () => {
        return (
            <div></div>
        )
    }
    render() {
        return (
            <nav className="navbar navbar-dark secondary-color">
                <NavLink className="navbar-brand" to="/">FLY</NavLink>
                <div>
                    <NavLink className="badge badge-pill" to="/login">Login</NavLink>
                </div>
            </nav>
        )
    }
}