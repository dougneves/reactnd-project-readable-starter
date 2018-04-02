import React from 'react';
import { List, Container, Label, Button } from 'semantic-ui-react';

const Post = props => (
  <List.Item>
    <List.Content>
      <List.Header>
        <h3>
          <Button icon="thumbs outline up" />
          <Button icon="thumbs outline down" />
          {props.title}
        </h3>
      </List.Header>
      <List.Description>
        <h4>
          Escrito por {props.author} em{' '}
          {new Date(props.timestamp).toLocaleString()}
        </h4>
        <Container text textAlign="justified">
          {props.body}
        </Container>

        <Label icon="star" content={props.voteScore} />
        <Label content={props.category} />
      </List.Description>
    </List.Content>
  </List.Item>
);

export default Post;
