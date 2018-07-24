import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { routeConfig } from './routeConfig'

class App extends React.Component {
  componentDidMount() {
    console.log(this.props)
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
