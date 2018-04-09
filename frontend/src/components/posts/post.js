import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Container, Label, Button } from 'semantic-ui-react';
import { setPostId, votePost } from '../../actions/post-actions';

const handleClick = props => props.dispatch(setPostId(props.id));
const handleVote = (props, vote) => props.dispatch(votePost(props.id, vote));

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
        <h4>
          Escrito por {props.author} em{' '}
          {new Date(props.timestamp).toLocaleString()}
        </h4>
        <Button
          icon="thumbs outline up"
          onClick={() => handleVote(props, 'upVote')}
        />
        <Button
          icon="thumbs outline down"
          onClick={() => handleVote(props, 'downVote')}
        />
        <Container text textAlign="justified">
          {props.body}
        </Container>

        <Label size="large" icon="star" content={props.voteScore} />
        <Label size="large" content={props.category} />
        <Label size="large" icon="comments" content={props.commentsCount} />
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

export default connect(state => {
  return { votePost: state.votePost };
})(Post);
