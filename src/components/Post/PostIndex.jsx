import moment from 'moment';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class PostIndex extends Component {
    state = {
        userId: null
    }

    componentDidMount = () => {
        this.setState({
            userId: parseInt(localStorage.getItem('id'))
        })
    }

    render() {
        const { post } = this.props;
        const { userId } = this.state;
        return (
            <section>
                <div className="row">
                    <div className="col">
                        <div className="d-inline-flex">
                            <h3 className="text-secondary">{post.title}</h3>
                            <small className="mt-3 ml-2 font-italic text-info">{post.user.name} - {moment(post.created_at).format('d/MMM/Y')}</small>
                            {
                                userId === post.user_id ? <NavLink className="ml-2 text-warning" to={`/posts/${post.id}/edit`}><i className="fas fa-edit"></i></NavLink> : null
                            }

                        </div>
                        <p>{post.content.slice(0, 250)} <NavLink className="text-warning font-italic font-light" to={`/posts/${post.id}`}>continue...</NavLink></p>
                    </div>
                </div>
            </section>
        )
    }
}

export default PostIndex;