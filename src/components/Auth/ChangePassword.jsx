import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import apiClient from '../../services/api';

export default class ChangePassword extends Component {
    state = {
        data: {
            id: this.props.match.params.id,
            token: this.props.match.params.token,
            password: null,
            password_confirmation: null
        },
        errors: {},
        redirect: false
    }
    handelChange = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [e.target.id]: value
            }
        })
    }

    handelSubmit = (e) => {
        e.preventDefault();
        apiClient.post('/change/password', this.state.data).then(res=>{
            this.setState({
                ...this.state,
                redirect: true
            });
        }).catch(err=>{
            this.setState({
                ...this.state,
                errors: err.response.data.errors
            });
        })
    }
    render() {
        if(this.state.redirect){
            return <Redirect to="/login"></Redirect>
        }
        return (
            <section className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-4 mx-auto mt-5">
                        <h4 className="text-center"><u>Reset Your Password</u></h4>
                        <form onSubmit={this.handelSubmit}>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input onChange={this.handelChange} type="password" name="password" id="password" className="form-control" placeholder="New Password" />
                                { this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div> }
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_confirmation">Password Confirmation</label>
                                <input onChange={this.handelChange} type="password" name="password_confirmation" id="password_confirmation" className="form-control" placeholder="Re type" />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-lg btn-secondary btn-block">CHANGE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}
