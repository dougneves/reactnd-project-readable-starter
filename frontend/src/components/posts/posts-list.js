import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';

import { fetchPosts } from '../../actions/post-actions';
import { CATEGORY, VOTES, TIMESTAMP, AUTHOR } from '../../types/order-types';

import Post from './post';

class PostsList extends Component {
  componentDidMount = () => {
    this.props.dispatch(fetchPosts());
  };

  sortOrder = (a, b) => {
    const { orderBy, inverted } = this.props.orderBy;
    let ret = 0;
    if (orderBy === VOTES) ret = a.voteScore - b.voteScore;
    else if (orderBy === TIMESTAMP) ret = a.timestamp - b.timestamp;
    else if (orderBy === CATEGORY) ret = a.category < b.category ? -1 : 1;
    else if (orderBy === AUTHOR) ret = a.author < b.author ? -1 : 1;
    if (inverted) ret = ret > 0 ? -1 : 1;
    return ret;
  };

  renderList = posts =>
    posts
      .sort(this.sortOrder)
      .map(post => (
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
      ));

  render = () => <List divided>{this.renderList(this.props.posts.list)}</List>;
}

export default connect(state => ({
  posts: state.posts,
  orderBy: state.orderBy
}))(PostsList);