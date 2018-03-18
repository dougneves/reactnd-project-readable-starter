import React, { Component } from 'react'
import { Route } from 'react-router-dom'

class App extends Component {
  render = () => (
    <div>
      <Route path="/" exact render={() => <div />} />
    </div>
  )
}

export default App
