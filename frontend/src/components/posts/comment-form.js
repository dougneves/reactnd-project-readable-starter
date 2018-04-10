import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';
import { addComment, fetchPostComments } from '../../actions/comment-actions';

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
    if (!this.props.categories.fetched && nextProps.categories.fetched)
      this.mapCategories(nextProps.categories.list);

    if (!this.props.addComment.fetched && nextProps.addComment.fetched) {
      this.props.dispatch(fetchPostComments(this.props.parentId));
    }
  };

  handleSubmit = () => {
    if (this.validate()) {
      this.props.dispatch(
        addComment({ ...this.state, parentId: this.props.parentId })
      );
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
  })
};

export default connect(state => {
  return {
    categories: state.categories,
    addComment: state.addComment,
    editComment: state.editComment
  };
})(PostForm);