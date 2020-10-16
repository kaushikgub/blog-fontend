import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logOut } from '../../store/actions/authActions'

class GuestNavbar extends Component {
    state = {
        redirect: false
    }
    logOut = () => {
        this.props.logOutUser(this.props.auth.user)
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOutUser: (user) => dispatch(logOut(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestNavbar);