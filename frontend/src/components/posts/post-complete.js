import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, List, Container, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { fetchPostComments } from '../../actions/comment-actions';

import Post from './post';
import Comment from './comment';
import CommentForm from './comment-form';

class PostComplete extends Component {
  componentWillMount = () => {
    if (!this.props.postId) this.props.history.push('/');
  };

  componentDidMount = () =>
    this.props.dispatch(fetchPostComments(this.props.postId));

  filterById = post => post.id === this.props.postId;

  renderPost = posts =>
    posts
      .filter(this.filterById)
      .map(post => (
        <Post
          key={post.id}
          id={post.id}
          timestamp={parseInt(post.timestamp, 10)}
          title={post.title}
          body={post.body}
          author={post.author}
          category={post.category}
          voteScore={post.voteScore}
          deleted={post.deleted}
          commentsCount={post.commentCount}
        />
      ));

  renderComments = comments =>
    comments.map(comment => (
      <Comment
        key={comment.id}
        id={comment.id}
        timestamp={parseInt(comment.timestamp, 10)}
        body={comment.body}
        author={comment.author}
        voteScore={comment.voteScore}
        parentId={this.props.postId}
      />
    ));

  render = () => (
    <div>
      {this.props.posts.fetching && <Loader active inline="centered" />}
      <List divided>{this.renderPost(this.props.posts.list)}</List>
      <Divider />
      <Container>
        {this.props.comments.fetching && <Loader active inline="centered" />}
        <List divided>{this.renderComments(this.props.comments.list)}</List>
      </Container>
      <Divider />
      <CommentForm parentId={this.props.postId} />
    </div>
  );
}

PostComplete.propTypes = {
  posts: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired
  }),
  postId: PropTypes.string.isRequired,
  comments: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired
  })
};

export default connect(state => ({
  posts: state.posts,
  postId: state.postId,
  comments: state.comments
}))(PostComplete);
