import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import apiClient from '../../services/api';

export default class SideBar extends Component {
    state = {
        posts: []
    }
    componentDidMount = () => {
        apiClient.get('/posts/recent').then(res => {
            this.setState({
                posts: res.data
            });
        })
    }
    render() {
        const { posts } = this.state;
        return (
            <section>
                <div className="row">
                    <div className="col">
                        <h4 className="m-1 text-center">Recent Posts</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col list-group">
                        {
                            posts.map(post => {
                                return <NavLink key={post.id} className="list-group-item list-group-item-action" to={`/posts/${post.id}`}>{post.title}</NavLink>
                            })
                        }
                    </div>
                </div>
            </section>
        )
    }
}
