import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { logOut } from '../../store/actions/authActions'

class Navbar extends Component {
    state = {
        redirect: false
    }
    logOut = () => {
        this.props.logOutUser(this.props.auth.user)
    }
    render() {
        const { auth } = this.props;
        if(!auth){
            return <Redirect to="/login"></Redirect>
        }
        return (
            <nav className="navbar navbar-dark primary-color">
                <NavLink className="navbar-brand" to="/">FLY</NavLink>
                <div>
                    <NavLink className="badge badge-pill badge-success mr-2" to="/profiles">Profile</NavLink>
                    <NavLink onClick={this.logOut} className="badge badge-pill badge-danger" to="#">Logout</NavLink>
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
        logOutUser:(user) => dispatch(logOut(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);