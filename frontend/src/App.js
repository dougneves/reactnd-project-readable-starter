import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Body from './components/body'

class App extends Component {
  render = () => (
    <div>
      <Route path="/" exact component={Body} />
    </div>
  )
}

export default App
