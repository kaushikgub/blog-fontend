import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import apiClient from '../../services/api'
import Navbar from '../Layouts/Navbar'

export default class PostCreate extends Component {
    state = {
        data: {
            title: '',
            content: '',
            status: 'Publish'
        },
        redirect: false,
        errors: {}
    }

    onchange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.id]: e.target.value
            }
        })
    }

    handelSubmit = (e) => {
        e.preventDefault();
        apiClient.post('/posts', this.state.data).then(res => {
            if (res.data === 'Created') {
                this.setState({
                    redirect: true
                })
            }
        }).catch(err => {
            this.setState({
                errors: err.response.data.errors
            });
        });
    }

    render() {
        const { redirect } = this.state;
        const { errors } = this.state;
        if (redirect) {
            return <Redirect to="/"></Redirect>
        }
        return (
            <div>
                <Navbar></Navbar>
                <section className="container">
                    <div className="row mt-2">
                        <div className="col">
                            <h3 className="text-center text-info">New Post</h3>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <form onSubmit={this.handelSubmit}>
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="title">Title</label>
                                            <input onChange={this.onchange} type="text" name="title" id="title" value={this.state.data.title} className="form-control" placeholder="Title" />
                                        </div>
                                        {errors.title && <div className="alert alert-danger">{errors.title}</div>}
                                    </div>

                                    <div className="col-sm-12 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select onChange={this.onchange} name="status" id="status" className="form-control" >
                                                <option value="Publish">Publish</option>
                                                <option value="Archive">Archive</option>
                                            </select>
                                        </div>
                                        {errors.status && <div className="alert alert-danger">{errors.status}</div>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="content">Content</label>
                                            <textarea onChange={this.onchange} name="content" id="content" value={this.state.data.content} className="form-control" placeholder="Content here" rows="10"></textarea>
                                        </div>
                                        {errors.content && <div className="alert alert-danger">{errors.content}</div>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group float-right">
                                            <button type="submit" className="btn btn-success">PUBLISH</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
