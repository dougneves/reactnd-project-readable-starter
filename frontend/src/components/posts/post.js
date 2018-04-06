import React from 'react';
import { List, Container, Label, Button } from 'semantic-ui-react';

const Post = props => (
  <List.Item>
    <List.Content>
      <List.Header>
        <h3>{props.title}</h3>
      </List.Header>
      <List.Description>
        <h4>
          Escrito por {props.author} em{' '}
          {new Date(props.timestamp).toLocaleString()}
        </h4>
        <Button icon="thumbs outline up" />
        <Button icon="thumbs outline down" />
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

export default Post;
