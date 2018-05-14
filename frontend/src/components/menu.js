import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions/category-actions';
import { Menu, Loader } from 'semantic-ui-react';

class AppMenu extends Component {
  state = { visible: false, categories: [] };

  componentDidMount = () => {
    this.props.dispatch(fetchCategories());
  };

  categoryList = categories =>
    categories.map(category => (
      <Menu.Item
        name={category.path}
        key={category.path}
        active={this.props.filter === category.path}
      >
        <Link to={`/${category.path}`}>{category.name}</Link>
      </Menu.Item>
    ));

  render = () => (
    <div>
      <h3>Categorias</h3>
      <Menu fluid vertical tabular>
        <Menu.Item active={!this.props.filter}>
          <Link to="/">Todos os Posts</Link>
        </Menu.Item>
        {this.props.categories.fetching && <Loader active inline="centered" />}
        {this.categoryList(this.props.categories.list)}
      </Menu>
    </div>
  );
}

AppMenu.propTypes = {
  categories: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired
  }),
  filter: PropTypes.string.isRequired
};

export default connect(s => ({ categories: s.categories, filter: s.filter }))(
  AppMenu
);
