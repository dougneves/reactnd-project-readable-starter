import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Checkbox } from 'semantic-ui-react';

import { changeOrder } from '../actions/order-and-filter-actions';
import { CATEGORY, VOTES, TIMESTAMP, AUTHOR } from '../types/order-types';

class OrderBy extends Component {
  orderOptions = [
    {
      key: 1,
      value: CATEGORY,
      text: 'Categoria'
    },
    {
      key: 2,
      value: VOTES,
      text: 'Votos'
    },
    {
      key: 3,
      value: TIMESTAMP,
      text: 'Data'
    },
    {
      key: 4,
      value: AUTHOR,
      text: 'Autor'
    }
  ];
  state = {
    orderBy: this.orderOptions[0].value,
    inverted: false
  };

  componentDidMount = () => this.dispatch();
  componentDidUpdate = () => this.dispatch();

  orderBy = (e, data) => this.setState({ orderBy: data.value });
  changeInverted = (e, data) => this.setState({ inverted: data.checked });
  dispatch = () => this.props.dispatch(changeOrder(this.state));

  render = () => (
    <div>
      <Dropdown
        onChange={this.orderBy}
        placeholder="Ordenar Por..."
        selection
        defaultValue={this.state.orderBy}
        options={this.orderOptions}
      />{' '}
      <Checkbox
        label="decrescente"
        checked={this.state.inverted}
        onChange={this.changeInverted}
      />
    </div>
  );
}

export default connect()(OrderBy);
