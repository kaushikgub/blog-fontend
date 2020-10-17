import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import apiClient from '../../services/api';

class Login extends Component {
    state = {
        data: {
            email: null,
            password: null,
            remember: false
        },
        redirect: false,
        message: null
    }

    handelChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [e.target.id]: value
            }
        })
    }

    handelsubmit = async (e) => {
        e.preventDefault();
        await apiClient.post('/login', this.state.data).then(res => {
            if (res.data.message) {
                this.setState({
                    ...this.state,
                    message: 'Something went wrong'
                })
            } else {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id', res.data.userId);
                this.setState({
                    ...this.state,
                    redirect: true
                })
            }
        }).catch(res => {
            this.setState({
                ...this.state,
                message: 'Something went wrong'
            })
        })
    }

    handelErrorCheck = () => {
        return (
            <div className="alert alert-danger text-center">
                {this.state.message}
            </div>
        )
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'></Redirect>
        }
        return (
            <section className="container">
                <div className="row mt-5">
                    <div className="col-sm-12 col-md-8 col-lg-5 mx-auto">
                        <h4 className="text-center font-weight-bold text-success">Login Form</h4>
                        {this.state.message && this.handelErrorCheck()}
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
                                        <input onClick={this.handelChange} id="remember" name="remember" type="checkbox" value="remember" /> Remember me
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


export default Login;