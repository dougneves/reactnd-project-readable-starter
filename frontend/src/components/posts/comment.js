import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Container, Label, Button, Divider } from 'semantic-ui-react';
import { voteComment, deleteComment } from '../../actions/post-actions';
import { UP_VOTE, DOWN_VOTE } from '../../types/vote-types';

const handleCommentVote = (props, vote) =>
  props.dispatch(
    voteComment({ commentId: props.id, parentId: props.parentId, vote })
  );
const handleDeleteComment = props =>
  props.dispatch(
    deleteComment({ commentId: props.id, parentId: props.parentId })
  );

const Comment = props => (
  <List.Item>
    <List.Content>
      <List.Description>
        <Container text textAlign="justified">
          {props.body}
        </Container>
        <p>
          Resposta de <strong>{props.author}</strong> em{' '}
          <strong>{new Date(props.timestamp).toLocaleString()}</strong>
        </p>
        <Label size="small" icon="star" content={props.voteScore} />
        <Button
          size="small"
          icon="thumbs outline up"
          onClick={() => handleCommentVote(props, UP_VOTE)}
        />
        <Button
          size="small"
          icon="thumbs outline down"
          onClick={() => handleCommentVote(props, DOWN_VOTE)}
        />
        <Button
          size="small"
          icon="ban"
          onClick={() => handleDeleteComment(props)}
        >
          Apagar comentário
        </Button>
      </List.Description>
    </List.Content>
  </List.Item>
);

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  parentId: PropTypes.string.isRequired
};

export default connect()(Comment);
