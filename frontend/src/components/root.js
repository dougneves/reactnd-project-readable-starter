import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostsList from './posts/posts-list';
import { changeFilter, clearFilter } from '../actions/order-and-filter-actions';
import OrderBy from './order-by';

class Root extends Component {
  componentDidMount = () => this.updateFilter();
  componentDidUpdate = () => this.updateFilter();

  updateFilter = () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.category
    )
      this.props.dispatch(changeFilter(this.props.match.params.category));
    else this.props.dispatch(clearFilter());
  };

  render = () => (
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
}

export default connect()(Root);
