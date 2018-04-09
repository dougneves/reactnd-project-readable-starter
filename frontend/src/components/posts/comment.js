import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Container, Label, Button } from 'semantic-ui-react';

const Comment = props => (
  <List.Item>
    <List.Content>
      <List.Description>
        <Button size="small" icon="thumbs outline up" />
        <Button size="small" icon="thumbs outline down" />
        Resposta de {props.author} em{' '}
        {new Date(props.timestamp).toLocaleString()}
        <Container text textAlign="justified">
          {props.body}
        </Container>
        <Label size="small" icon="star" content={props.voteScore} />
      </List.Description>
    </List.Content>
  </List.Item>
);

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired
};

export default Comment;
