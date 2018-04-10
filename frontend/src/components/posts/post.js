import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Container, Label, Button } from 'semantic-ui-react';
import {
  setPostId,
  votePost,
  deletePost,
  editPost
} from '../../actions/post-actions';

const handleClick = props => props.dispatch(setPostId(props.id));
const handleVote = (props, vote) => props.dispatch(votePost(props.id, vote));
const handleDelete = props => props.dispatch(deletePost(props.id));
const handleEdit = props => {
  props.dispatch(editPost(props));
  props.history.push('/editPost');
};

const Post = props => (
  <List.Item>
    <List.Content>
      <List.Header>
        <h3>
          <Link to="/viewPost" onClick={() => handleClick(props)}>
            {props.title}
          </Link>
        </h3>
      </List.Header>
      <List.Description>
        <Container text textAlign="justified">
          {props.body}
        </Container>
        <p>
          Escrito por <strong>{props.author}</strong> em{' '}
          <strong>{new Date(props.timestamp).toLocaleString()}</strong>
        </p>
        <Label size="large" icon="star" content={props.voteScore} />
        <Label size="large" content={props.category} />
        <Label size="large" icon="comments" content={props.commentsCount} />
        <Button
          icon="thumbs outline up"
          onClick={() => handleVote(props, 'upVote')}
        />
        <Button
          icon="thumbs outline down"
          onClick={() => handleVote(props, 'downVote')}
        />
        <Button
          icon="ban"
          onClick={() => handleDelete(props)}
          content="Apagar post"
        />
        <Button
          icon="edit"
          onClick={() => handleEdit(props)}
          content="Editar post"
        />
      </List.Description>
    </List.Content>
  </List.Item>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired
};

export default withRouter(connect()(Post));
