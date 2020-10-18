import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import apiClient from '../../services/api'
import toastMessage from '../../services/toast'

export default class Registration extends Component {
    state = {
        data: {
            name: '',
            email: '',
            password: '',
        },
        redirect: false,
        errors: {}
    }

    passwordModify = (password) => {
        let finalPassword = '';
        for (var i = 0; i < password.length; i++) {
            let random = this.random(50);
            let value = parseInt(password.charCodeAt(i)) * 97;
            finalPassword += random + value + 'Q';
        }
        return finalPassword;
    }


    random = (length) => {
        var result = '';
        var characters = 'BCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result + 'A';
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

    handelsubmit = async (e) => {
        e.preventDefault();
        const formData = {
            ...this.state.data,
            password: this.passwordModify(this.state.data.password)
        }
        await apiClient.post('/registration', formData)
            .then(res => {
                if (res.data === 'Registered Successful') {
                    toastMessage('Registration Successful, Please check your email to active your account');
                    this.setState({
                        redirect: true
                    })
                }
            }).catch(err => {
                this.setState({
                    ...this.state,
                    errors: err.response.data.errors
                });
            })
    }


    render() {

        const { data, errors, redirect } = this.state;
        if (redirect) {
            return <Redirect to="/login"></Redirect>
        }

        return (
            <section>
                <section className="container">
                    <div className="row mt-5">
                        <div className="col-sm-12 col-md-6 mx-auto">
                            <h4 className="text-center font-weight-bold text-primary">Registration Form</h4>
                            <form onSubmit={this.handelsubmit}>
                                <div className="form-group">
                                    <label htmlFor="name" className="col-form-label">Name</label>
                                    <input onChange={this.handelChange} type="text" id="name" className="form-control" name="name" placeholder="Name" value={data.name}></input>
                                </div>
                                {errors.name && <div className="alert alert-danger">{errors.name}</div>}
                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">Email</label>
                                    <input onChange={this.handelChange} type="email" id="email" className="form-control" name="email" placeholder="Email" value={data.email}></input>
                                </div>
                                {errors.email && <div className="alert alert-danger">{errors.email}</div>}
                                <div className="form-group">
                                    <label htmlFor="password" className="col-form-label">Password</label>
                                    <input onChange={this.handelChange} type="password" id="password" className="form-control" name="password" placeholder="Password" value={data.password} />
                                </div>
                                {errors.password && <div className="alert alert-danger">{errors.password}</div>}
                                <div className="form-group">
                                    <label htmlFor="">Already have an account?</label>
                                    <NavLink className="ml-3 text-success float-right" to="/login">Login</NavLink>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-lg btn-primary btn-block" type="submit">Registration</button>
                                </div>
                            </form>
                            <p className="text-center mt-3"><NavLink className="text-secondary" to="/">Home</NavLink> / <NavLink className="text-info" to="/forgot-password">Forgot Password</NavLink></p>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}
