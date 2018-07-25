import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { routeConfig } from './routeConfig'
import { updateCurrentPage } from './Store/actions/global.action'

class App extends React.Component {
  componentDidMount() {
    console.log(this.props)
    const store = this.props
    store.dispatch(updateCurrentPage('/about'))
  }
  render() {
    return (
      <Router>
        <div>
          <ul> 
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
          </ul>
          { routeConfig.map((route, i) => <Route key={i} {...route} />) }
        </div>
      </Router>
    );
  }
}

export default connect(state => state)(App)
