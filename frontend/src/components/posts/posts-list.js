import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions/post-actions'
import Post from './post'

class PostsList extends Component {
  componentDidMount = () => {
    this.props.dispatch(fetchPosts())
  }

  renderList = posts =>
    posts.map(post => (
      <Post
        key={post.id}
        timestamp={post.timestamp}
        title={post.title}
        body={post.body}
        author={post.author}
        category={post.category}
        voteScore={post.voteScore}
        deleted={post.deleted}
      />
    ))

  render = () => <div>{this.renderList(this.props.posts.list)}</div>
}

export default connect(s => ({ posts: s.posts }))(PostsList)
