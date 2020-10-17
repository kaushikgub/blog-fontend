import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import apiClient from '../../services/api'
import Navbar from '../Layouts/Navbar'
import PostIndex from '../Post/PostIndex'

export default class Profile extends Component {
    state = {
        profile: {},
        loading: true,
        login: true
    }

    componentDidMount = () => {
        apiClient.get('/profiles').then(res => {
            this.setState({
                ...this.state,
                profile: res.data,
                loading: false
            })
        }).catch(err=>{
            if(err.response.status === 401){
                this.setState({
                    ...this.state,
                    login: false
                });
            }
        })
    }

    getPosts = async (id) => {
        await apiClient.get('/profiles').then(res => {
            this.setState({
                ...this.state,
                profile: res.data,
                loading: false
            })
        })
    }

    render() {
        const {profile} = this.state;
        if(!this.state.login){
            return <Redirect to="/login"></Redirect>
        }
        return (
            <div>
                <Navbar></Navbar>
                {
                    this.state.loading ? (
                        <div className="text-center mt-2">
                            <div className="spinner-border text-success" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                            <section className="container mt-2">
                                <div className="row mt-2">
                                    <div className="col">
                                        <NavLink to="/posts/create" className="btn btn-primary"><i className="fas fa-plus mr-2"></i>New - Post</NavLink>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-8">
                                        <h4 className="text-center mt-2 text-success font-weight-bold font-italic"><u>Your Posts</u></h4>
                                        {
                                            profile.posts.length === 0 ? (
                                                <div>
                                                    <p className="text-center text-danger alert alert-primary mt-5">You have no post</p>
                                                </div>
                                            ) : (
                                                <div>
                                                    {
                                                        profile.posts.map((post, key) => {
                                                            return <PostIndex key={key} post={post}></PostIndex>
                                                        })
                                                    }
                                                </div>
                                            )  
                                        }
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="text-center font-weight-bold">Your Info</h4>
                                            </div>

                                            <div className="card-body">
                                                <p className="m-1">Name: {profile.name}</p>
                                                <p className="m-1">Email: {profile.email}</p>
                                                <p className="m-1">Posts: {profile.posts.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )
                }

            </div>
        )
    }
}
