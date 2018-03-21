import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Categories from './categories'
import PostsList from './posts/posts-list'

class Body extends Component {
  render = () => (
    <Container>
      <Categories />
      <PostsList />
    </Container>
  )
}

export default Body
