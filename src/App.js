import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './App.css'

import { routeConfig, staticRouteConfig } from './routeConfig'
import { GetArgsFromHref, GetBrowserType } from './Utilities'
import { getUserInfo } from './Store/actions/global.action'

class PrivateRoute extends React.Component {
  state = {
    ifError: false
  }
  componentWillMount() {
    const { store, type, location } = this.props
    switch(type) {
      case 'wechat':
        const code = GetArgsFromHref(location.search, 'code')
        // const openId = 'ozg0N1G0E9TneBFdhQGL-GchMktU'
        // window.localStorage.setItem('inputValue', JSON.stringify({}))
        const openId = window.localStorage.getItem('openId') || store.globalReducer.openId
        store.dispatch(getUserInfo('wechat', openId, code, error => {
          console.log(error)
          this.setState({ifError: true})
        }))
        return
      case 'app':
        const userId = GetArgsFromHref(location.search, 'userId') || store.globalReducer.userId
        store.dispatch(getUserInfo('app', userId, null, error => {
          console.log(error)
          this.setState({ifError: true})
        }))
        return
      default:
        return
    }
  }

  render() {
    const { type, location, ...rest } = this.props
    switch(type) {
      case 'wechat':
        return this.state.ifError === true ? <Redirect to={{pathname: '/error'}} /> : <Route {...rest} />
      case 'app':
        return this.state.ifError === true ? <Redirect to={{pathname: '/error', search: location.search}} /> : <Route {...rest} />
      default:
        return 'You should open this link inside wechat app or pciuser app!'
    }
  }
}

class App extends React.Component {
  render() {
    const type = GetBrowserType()
    return (
      <Router basename='/survey'>
        <Switch>
          { routeConfig.map((route, i) => <PrivateRoute key={i} {...route} type={type} store={this.props} />) }
          { staticRouteConfig.map((route, i) => <Route key={i} {...route} />) }
        </Switch>
      </Router>
    )
  }
}

export default connect(state => state)(App)
