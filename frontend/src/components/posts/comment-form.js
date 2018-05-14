import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';
import {
  addComment,
  fetchPostComments,
  editComment
} from '../../actions/comment-actions';
import { fetchPosts } from '../../actions/post-actions';

const DEFAULT_STATE = {
  id: '',
  parentId: '',
  body: '',
  author: '',
  formError: false
};

class PostForm extends Component {
  state = DEFAULT_STATE;

  handleChange = (e, v) => {
    this.setState({ [v.name]: v.value, formError: false });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.id !== this.props.editComment.id) {
      this.setState({ ...this.props.editComment });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (!this.props.addComment.fetched && nextProps.addComment.fetched) {
      this.props.dispatch(fetchPostComments(this.props.parentId));
      this.props.dispatch(fetchPosts());
    }
  };

  handleSubmit = () => {
    if (this.validate()) {
      this.props.dispatch(
        addComment({ ...this.state, parentId: this.props.parentId })
      );
      this.props.dispatch(editComment({ id: '', ...DEFAULT_STATE }));
      this.setState(DEFAULT_STATE);
    }
  };

  validate = () => {
    let errors = false;
    if (!this.state.body) errors = true;
    if (!this.state.author) errors = true;
    this.setState({ formError: errors });
    return !errors;
  };

  render = () => {
    const editing = this.state.id ? true : false;
    return (
      <div>
        <h4>Comentar</h4>
        <Form
          onSubmit={this.handleSubmit}
          loading={
            this.props.categories.fetching || this.props.addComment.fetching
          }
          error={this.state.formError}
        >
          <Message error>Todos os campos são obrigatórios.</Message>
          <Form.TextArea
            onChange={this.handleChange}
            name="body"
            placeholder="Comentário"
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
  addComment: PropTypes.shape({
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired
  }),
  editComment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  })
};

export default connect(state => {
  return {
    categories: state.categories,
    addComment: state.addComment,
    editComment: state.editComment
  };
})(PostForm);
