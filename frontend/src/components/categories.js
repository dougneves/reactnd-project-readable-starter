import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/categories-actions'
import { Dropdown } from 'semantic-ui-react'

class App extends Component {
  state = { dropdownOptions: [] }
  componentDidMount = () => {
    this.props.dispatch(fetchCategories())
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.categories.fetched)
      this.setState({
        dropdownOptions: nextProps.categories.list.map(categorie => ({
          key: categorie.path,
          value: categorie.path,
          text: categorie.name
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

export default connect(s => ({ categories: s.categories }))(App)
