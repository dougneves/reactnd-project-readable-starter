import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import Root from './root';
import Menu from './menu';
import PostForm from './posts/post-form';
import PostComplete from './posts/post-complete';

const Body = props => (
  <div>
    <Grid>
      <Grid.Row>
        <Grid.Column width={3}>
          <Menu />
        </Grid.Column>
        <Grid.Column width={9}>
          <Route path="/" exact component={Root} />
          <Route path="/newPost" exact component={PostForm} />
          <Route path="/editPost" exact component={PostForm} />
          <Route path="/:category" exact component={Root} />
          <Route path="/:category/:post_id" exact component={PostComplete} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default Body;
