import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'

import { routeConfig } from './routeConfig'

class App extends React.Component {
  render() {
    return (
      <Router basename='/survey'>
        <Switch>
          { routeConfig.map((route, i) => <Route key={i} {...route} />) }
        </Switch>
      </Router>
    )
  }
}

export default connect(state => state)(App)
