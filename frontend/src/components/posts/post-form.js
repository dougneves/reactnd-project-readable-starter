import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';

const PostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <h1>Nova postagem</h1>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text" />
        </div>
      </div>
    </form>
  );
};

export default reduxForm({ form: 'post' })(PostForm);
