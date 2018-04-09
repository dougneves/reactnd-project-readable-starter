import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';
import { addPost } from '../../actions/post-actions';

class PostForm extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: '',
    categories: [],
    formError: false
  };

  mapCategories = categories =>
    this.setState({
      categories: categories.map(category => {
        return {
          key: category.path,
          text: category.name,
          value: category.path
        };
      })
    });

  handleChange = (e, v) => {
    this.setState({ [v.name]: v.value, formError: false });
  };

  componentDidMount = () => {
    if (this.props.categories.fetched)
      this.mapCategories(this.props.categories.list);
  };

  componentWillReceiveProps = nextProps => {
    if (!this.props.categories.fetched && nextProps.categories.fetched)
      this.mapCategories(nextProps.categories.list);

    if (!this.props.addPost.fetched && nextProps.addPost.fetched) {
      this.props.history.push('/');
    }
  };

  handleSubmit = () => {
    if (this.validate()) this.props.dispatch(addPost(this.state));
  };

  validate = () => {
    let errors = false;
    if (!this.state.title) errors = true;
    if (!this.state.body) errors = true;
    if (!this.state.category) errors = true;
    if (!this.state.author) errors = true;
    this.setState({ formError: errors });
    return !errors;
  };

  render = () => {
    return (
      <div>
        <h1>Nova postagem</h1>
        <Form
          onSubmit={this.handleSubmit}
          loading={this.props.categories.fetching}
          error={this.state.formError}
        >
          <Message error>Todos os campos são obrigatórios.</Message>
          <Form.Input
            onChange={this.handleChange}
            fluid
            name="title"
            placeholder="Título"
            value={this.state.title}
          />
          <Form.TextArea
            onChange={this.handleChange}
            name="body"
            placeholder="Post"
            value={this.state.body}
          />
          <Form.Input
            onChange={this.handleChange}
            fluid
            name="author"
            placeholder="Autor"
            value={this.state.author}
          />
          <Form.Select
            onChange={this.handleChange}
            fluid
            name="category"
            placeholder="Categoria"
            options={this.state.categories}
          />
          <Form.Button type="submit">Enviar</Form.Button>
        </Form>
      </div>
    );
  };
}

export default connect(state => {
  return {
    categories: state.categories,
    addPost: state.addPost
  };
})(PostForm);
