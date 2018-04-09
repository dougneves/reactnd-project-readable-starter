import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, List, Container, Divider, Button } from 'semantic-ui-react';

import { fetchPostComments } from '../../actions/post-actions';

import Post from './post';
import Comment from './comment';

class PostsList extends Component {
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
        timestamp={comment.timestamp}
        body={comment.body}
        author={comment.author}
        voteScore={comment.voteScore}
      />
    ));

  render = () => (
    <div>
      {this.props.posts.fetching && <Loader active inline="centered" />}
      <List divided>{this.renderPost(this.props.posts.list)}</List>
      <Divider />
      <Button>Responder</Button>
      <Divider />
      <Container>
        {this.props.comments.fetching && <Loader active inline="centered" />}
        <List divided>{this.renderComments(this.props.comments.list)}</List>
      </Container>
    </div>
  );
}

export default connect(state => ({
  posts: state.posts,
  postId: state.postId,
  comments: state.comments
}))(PostsList);
