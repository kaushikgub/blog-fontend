import React, { Component } from 'react'
import Pagination from 'react-js-pagination'
import { Redirect } from 'react-router-dom'
import apiClient from '../../services/api'
import GuestNavbar from '../Layouts/GuestNavbar'
import Navbar from '../Layouts/Navbar'
import SideBar from '../Layouts/SideBar'
import PostIndex from '../Post/PostIndex'

class Home extends Component {
    state = {
        posts: {},
        loading: true,
        redirect: null,
        search: '',
        login: false
    }

    componentDidMount = () => {
        const userId = localStorage.getItem('id');
        if(userId){
            this.setState({
                ...this.state,
                login: true
            });
        }
        this.getPosts();
    }

    handelSearch = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    submitSearch = (e) => {
        e.preventDefault();
        this.getPosts();
    }

    getPosts = async (page = 1) => {
        const link = `/posts?page=${page}&&search=${this.state.search}`;
        await apiClient.get(link).then(res => {
            this.setState({
                ...this.state,
                posts: res.data,
                loading: false
            })
        }).catch(err => {
            if (err.response.status === 419) {
                this.setState({
                    redirect: true
                })
            }
        })
    }

    renderPosts = () => {
        const { data, current_page, per_page, total } = this.state.posts;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                        {
                            data.map((post, key) => {
                                return <PostIndex key={key} post={post}></PostIndex>
                            })
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Pagination
                            activePage={current_page}
                            totalItemsCount={total}
                            itemsCountPerPage={per_page}
                            onChange={(page) => this.getPosts(page)}
                            firstPageText="First"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                        ></Pagination>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/"></Redirect>
        }
        return (
            <div>
                { !this.state.login ? (<GuestNavbar></GuestNavbar>) : (<Navbar></Navbar>)}
                {
                    this.state.loading ? (
                        <div className="text-center mt-2">
                            <div className="spinner-border text-success" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                            <section className="container">
                                <div className="row mt-2">
                                    <div className="col">
                                        <form onSubmit={this.submitSearch}>
                                            <div className="md-form">
                                                <input type="text" className="form-control" name="search" id="search" onChange={this.handelSearch} value={this.state.search} placeholder="Type Post title & Author..." autoComplete="off" />
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-sm-12 col-md-9">
                                        {this.state.posts && this.state.posts.data.length !== 0 && this.renderPosts()}
                                    </div>
                                    <div className="col-sm-12 col-md-3 mb-3">
                                        <SideBar></SideBar>
                                    </div>
                                </div>
                            </section>
                        )
                }

            </div>
        )
    }
}

export default Home;