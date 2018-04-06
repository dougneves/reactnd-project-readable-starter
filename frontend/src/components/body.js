import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import Root from './root';
import Menu from './menu';

const Body = props => (
  <div>
    <Grid>
      <Grid.Row>
        <Grid.Column width={3}>
          <Menu />
        </Grid.Column>
        <Grid.Column width={9}>
          <Route path="/" exact component={Root} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default Body;
