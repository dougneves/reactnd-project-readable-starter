import React from 'react';
import { Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PostsList from './posts/posts-list';
import OrderBy from './order-by';

const Root = props => (
  <div>
    <h2>Posts</h2>
    <Divider />
    <Link to="/newPost">Novo Post</Link>
    <Divider />
    <div>
      <h4>Ordenar</h4> <OrderBy />
    </div>
    <Divider />
    <PostsList />
  </div>
);
export default Root;
