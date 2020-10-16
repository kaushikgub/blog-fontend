import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import apiClient from '../../services/api'
import { logIn } from '../../store/actions/authActions'

class Login extends Component {
    state = {
        data: {},
        redirect: false
    }

    handelChange = (e) => {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [e.target.id]: e.target.value
            }
        })
    }

    handelsubmit = (e) => {
        e.preventDefault();
        apiClient.get('/csrf-cookie').then(response => {
            this.props.logInUser(this.state.data)
        });
    }

    handelErrorCheck = (e) => {
        const { auth } = this.props;
        if (auth && auth.message === 'Login Error') {
            return <span className="text-center alert alert-danger d-block">Something Went Wrong</span>
        }
        return null;
    }


    errorHandlink = () => {

    }


    render() {
        const { auth } = this.props;
        if (auth && auth.message === 'You are loged in') {
            return <Redirect to="/"></Redirect>
        }
        return (
            <section className="container">
                    <div className="row mt-5">
                        <div className="col-sm-12 col-md-8 col-lg-5 mx-auto">
                            <h4 className="text-center font-weight-bold text-success">Login Form</h4>
                            {this.handelErrorCheck()}
                            <form onSubmit={this.handelsubmit}>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">Email</label>
                                    <input onChange={this.handelChange} type="text" id="email" className="form-control" name="email" placeholder="Email" value={this.state.email}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="col-form-label">Password</label>
                                    <input onChange={this.handelChange} type="password" id="password" className="form-control" name="password" placeholder="Password" value={this.state.password} />
                                </div>
                                <div className="form-group">
                                    <div className="checkbox">
                                        <label>
                                            <input onChange={this.handelChange} name="remember" type="checkbox" value="remember" /> Remember me
                                </label>
                                        <NavLink className="float-right text-primary" to="registration">Registration</NavLink>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-lg btn-success btn-block" type="submit">Log in</button>
                                </div>
                            </form>
                            <p className="text-center mt-3"><NavLink className="text-secondary" to="/">Home</NavLink> / <NavLink className="text-info" to="/forgot-password">Forgot Password</NavLink></p>
                        </div>
                    </div>
                </section>
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
        logInUser: (user) => dispatch(logIn(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);