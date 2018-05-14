import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, List, Container, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { fetchPostComments } from '../../actions/comment-actions';
import { setPostId } from '../../actions/post-actions';
import { changeFilter } from '../../actions/order-and-filter-actions';
import Post from './post';
import Comment from './comment';
import CommentForm from './comment-form';
import { fetchPosts } from '../../actions/post-actions';

class PostComplete extends Component {
  componentWillMount = () => {
    if (
      !this.props.match ||
      !this.props.match.params ||
      !this.props.match.params.post_id
    )
      this.props.history.push('/');
  };

  componentDidMount = () => {
    this.getComments();
    this.props.dispatch(fetchPosts());
  };
  //componentDidUpdate = () => this.getPost();

  getComments = () => {
    if (this.props.match && this.props.match.params) {
      if (this.props.match.params.post_id) {
        this.props.dispatch(fetchPostComments(this.props.match.params.post_id));
        this.props.dispatch(setPostId(this.props.match.params.post_id));
      }
      if (this.props.match.params.category) {
        this.props.dispatch(changeFilter(this.props.match.params.category));
      }
    }
  };

  filterById = post => post.id === this.props.match.params.post_id;

  renderPost = posts => {
    const filtered = posts.filter(this.filterById);
    if (filtered.length > 0)
      return filtered.map(post => (
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
    else <p>Post com id {this.props.match.params.post_id} não encontrado</p>;
  };

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
