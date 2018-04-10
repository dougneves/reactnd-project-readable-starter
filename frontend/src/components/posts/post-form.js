import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';
import { addPost, editPost } from '../../actions/post-actions';

class PostForm extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: '',
    categories: [],
    formError: false,
    id: ''
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.id !== this.props.editPost.id) {
      this.setState({
        ...this.props.editPost
      });
    }
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
  };

  handleSubmit = () => {
    if (this.validate()) {
      this.props.dispatch(addPost(this.state));
      this.props.dispatch(editPost({ id: '', title: '', body: '' }));
      this.props.history.push('/');
    }
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
    const editing = !!this.state.id;
    return (
      <div>
        <h1>{editing ? 'Editar postagem' : 'Nova postagem'}</h1>
        <Form
          onSubmit={this.handleSubmit}
          loading={
            this.props.categories.fetching || this.props.addPost.fetching
          }
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
            disabled={editing}
          />
          <Form.Select
            onChange={this.handleChange}
            fluid
            name="category"
            placeholder="Categoria"
            options={this.state.categories}
            value={this.state.category}
            disabled={editing}
          />
          <Form.Button type="submit">Enviar</Form.Button>
        </Form>
      </div>
    );
  };
}

PostForm.propTypes = {
  categories: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired
  }),
  addPost: PropTypes.shape({
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired
  }),
  editPost: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  })
};

export default connect(state => {
  return {
    categories: state.categories,
    addPost: state.addPost,
    editPost: state.editPost
  };
})(PostForm);
