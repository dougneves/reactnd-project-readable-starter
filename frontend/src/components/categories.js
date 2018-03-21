import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/category-actions'
import { Dropdown } from 'semantic-ui-react'

class Categories extends Component {
  state = { dropdownOptions: [] }
  componentDidMount = () => {
    this.props.dispatch(fetchCategories())
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.categories.fetched)
      this.setState({
        dropdownOptions: nextProps.categories.list.map(category => ({
          key: category.path,
          value: category.path,
          text: category.name
        }))
      })
  }

  render = () => (
    <Dropdown
      placeholder="Categorias"
      loading={this.props.categories.fetching}
      selection
      options={this.state.dropdownOptions}
    />
  )
}

export default connect(s => ({ categories: s.categories }))(Categories)
