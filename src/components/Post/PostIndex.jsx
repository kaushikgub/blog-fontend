import moment from 'moment';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

class PostIndex extends Component {
    render() {
        const { post, auth } = this.props;
        return (
            <section>
                <div className="row">
                    <div className="col">
                        <div className="d-inline-flex">
                            <h3 className="text-secondary">{post.title}</h3>
                            <small className="mt-3 ml-2 font-italic text-info">{post.user.name} - {moment(post.created_at).format('d/MMM/Y')}</small>
                            {
                                auth && auth.user.id === post.user_id ? <NavLink className="ml-2 text-warning" to={`/posts/${post.id}/edit`}>edit</NavLink> : null
                            }

                        </div>
                        <p>{post.content.slice(0, 250)} <NavLink className="text-warning font-italic font-light" to={`/posts/${post.id}`}>continue...</NavLink></p>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth
    }
}

export default connect(mapStateToProps)(PostIndex)