import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';

import PostsList from './posts/posts-list';
import OrderBy from './order-by';

class Body extends Component {
  render = () => (
    <Container>
      <div>
        <h4>Ordenar</h4> <OrderBy />
      </div>
      <Divider />
      <div>
        <PostsList />
      </div>
    </Container>
  );
}

export default Body;
