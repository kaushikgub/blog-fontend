import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import apiClient from '../../services/api'
import Navbar from '../Layouts/Navbar'

export default class PostEdit extends Component {
    state = {
        data: {
            title: '',
            content: '',
            status: 'Publish'
        },
        redirect: false,
        loading: true,
        errors: {}
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;
        apiClient.get(`/posts/${id}/edit`).then(res => {
            this.setState({
                ...this.state,
                loading: false,
                data: res.data
            })
        }).catch(err => {
            this.setState({
                ...this.state,
                errors: err.response.data.errors
            });
        })
    }

    onchange = (e) => {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [e.target.id]: e.target.value
            }
        })
    }

    handelSubmit = (e) => {
        e.preventDefault();
        const { id } = this.props.match.params;
        apiClient.put(`/posts/${id}`, this.state.data).then(res => {
            if (res.data === 'Updated') {
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


    loadingBar = () => {
        return <div className="text-center mt-2">
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }

    render() {
        const { redirect, errors, data, loading } = this.state;
        if (redirect) {
            return <Redirect to="/"></Redirect>
        }
        return (
            <div>
                <Navbar></Navbar>
                {
                    loading ? (this.loadingBar()) : (
                        <section className="container">
                            <div className="row mt-2">
                                <div className="col">
                                    <h3 className="text-center text-info">Update Post</h3>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <form onSubmit={this.handelSubmit}>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="title">Title</label>
                                                    <input onChange={this.onchange} type="text" name="title" id="title" value={data.title} className="form-control" placeholder="Title" />
                                                </div>
                                                {errors.title && <div className="alert alert-danger">{errors.title}</div>}
                                            </div>

                                            <div className="col-sm-12 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="status">Status</label>
                                                    <select onChange={this.onchange} name="status" id="status" className="form-control" >
                                                        <option value={data.status}>{data.status}</option>
                                                        <option className={data.status === 'Publish' ? 'sr-only' : null} value="Publish">Publish</option>
                                                        <option className={data.status === 'Archive' ? 'sr-only' : null} value="Archive">Archive</option>
                                                    </select>
                                                </div>
                                                {errors.status && <div className="alert alert-danger">{errors.status}</div>}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="content">Content</label>
                                                    <textarea onChange={this.onchange} name="content" id="content" value={data.content} className="form-control" placeholder="Content here" rows="10"></textarea>
                                                </div>
                                                {errors.content && <div className="alert alert-danger">{errors.content}</div>}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group float-right">
                                                    <button type="submit" className="btn btn-primary">UPDATE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    )
                }
            </div>
        )
    }
}
