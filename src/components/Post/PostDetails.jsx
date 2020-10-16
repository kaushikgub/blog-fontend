import React, { Component } from 'react'
import apiClient from '../../services/api';
import Navbar from '../Layouts/Navbar';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import GuestNavbar from '../Layouts/GuestNavbar';
import { connect } from 'react-redux';

class PostDetails extends Component {
    state = {
        post: {},
        loading: true
    }
    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.loadData(id);
    }

    handelLinkClick = async (id) => {
        this.setState({
            ...this.state,
            loading: true
        })
        this.loadData(id);
    }

    loadData = async (id) => {
        await apiClient.get('/posts/' + id).then(res => {
            this.setState({
                post: res.data,
                loading: false
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { post } = this.state;
        const { auth } = this.props;
        return (
            <section>
                { auth ? (<Navbar></Navbar>) : (<GuestNavbar></GuestNavbar>)}
                <section className="container">
                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-9">
                            {
                                this.state.loading ? (
                                    <div className="text-center my-auto">
                                        <div className="spinner-border text-success" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                        <div>
                                            <h3 className="text-secondary d-inline-flex">{post.title}</h3>
                                            <small className="mt-3 ml-2 font-italic text-info">{post.user && post.user.name} - {moment(post.created_at).format('d/MMM/Y')}</small>
                                            <p>
                                                {
                                                    post.content.split('\n').map((item, key) => {
                                                        return <span key={key}>{item}<br /></span>
                                                    })
                                                }
                                            </p>
                                        </div>
                                    )
                            }

                        </div>

                        <div className="col-sm-12 col-md-3">
                            {
                                post.user &&
                                <div className="my-auto">
                                    <p className="text-info text-center mb-1">{post.user.name}`s Other Posts</p>
                                    <div className="list-group">
                                        {
                                            post.user.posts &&
                                            post.user.posts.slice(0, 10).map(post => {
                                                return <NavLink onClick={() => this.handelLinkClick(post.id)} className="list-group-item list-group-item-action" key={post.id} to={`/posts/${post.id}`}>{post.title}</NavLink>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth
    }
}

export default connect(mapStateToProps)(PostDetails);
