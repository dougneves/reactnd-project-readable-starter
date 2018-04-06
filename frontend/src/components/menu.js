import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions/category-actions';
import { Menu, Loader } from 'semantic-ui-react';

class AppMenu extends Component {
  state = { visible: false, categories: [] };

  componentDidMount = () => this.props.dispatch(fetchCategories());

  categoryList = categories =>
    categories.map(category => (
      <Menu.Item name={category.path}>
        <Link to={`/category/${category.path}`}>{category.name}</Link>
      </Menu.Item>
    ));

  render = () => (
    <div>
      <h3>Categorias</h3>
      {this.props.categories.fetching && <Loader active inline="centered" />}
      {this.categoryList(this.props.categories.list)}
    </div>
  );
}

export default connect(s => ({ categories: s.categories }))(AppMenu);
