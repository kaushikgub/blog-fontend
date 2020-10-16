import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import apiClient from '../../services/api'
import toastMessage from '../../services/toast'

export default class ForgotPassword extends Component {
    state =  {
        email: '',
        redirect: false

    }
    handelChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handelsubmit = (e) => {
        e.preventDefault();
        apiClient.post('/forgot/password', this.state).then(res=>{
            if(res.data.status === 'success'){
                toastMessage(res.data.message);
                this.setState({
                    redirect: true
                })
            } else {
                toastMessage(res.data.message, res.data.status);
            }
        })
    }
    render() {
        if(this.state.redirect){
            return <Redirect to="/login"></Redirect>
        }
        return (
            <section className="container">
                    <div className="row mt-5">
                        <div className="col-sm-12 col-md-8 col-lg-5 mx-auto">
                            <h4 className="text-center font-weight-bold text-info">Provide Your Valid Email</h4>
                            <form onSubmit={this.handelsubmit}>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">Email</label>
                                    <input onChange={this.handelChange} type="text" id="email" className="form-control form-control-lg" name="email" placeholder="Email" value={this.state.email}></input>
                                </div>
                                <div>
                                    <button className="btn btn-lg btn-info btn-block" type="submit">SUBMIT</button>
                                </div>
                            </form>
                            <p className="text-center mt-3"><NavLink className="text-secondary" to="/">Home</NavLink> / <NavLink className="text-success" to="/login">Login</NavLink> / <NavLink className="text-primary" to="/registration">Registration</NavLink></p>
                        </div>
                    </div>
                </section>
        )
    }
}
