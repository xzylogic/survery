import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'

import { routeConfig, staticRouteConfig } from './routeConfig'
import { GetArgsFromHref, GetBrowserType } from './Utilities'
import { getUserInfo, updateUserIdAction } from './Store/actions/global.action'

class PrivateRoute extends React.Component {
  componentWillMount() {
    const { store, type, location } = this.props
    switch(type) {
      case 'wechat':
        const code = GetArgsFromHref(location.search, 'code')
        const openId = window.localStorage.getItem('openId') || store.globalReducer.openId
        store.dispatch(getUserInfo('wechat', openId, code))
        return
      case 'app':
        const userId = GetArgsFromHref(location.search, 'userId') || store.globalReducer.userId
        store.dispatch(updateUserIdAction(userId))
        store.dispatch(getUserInfo('app', userId))
        return
      default:
        return
    }
  }

  render() {
    const { type, ...rest } = this.props
    switch(type) {
      case 'wechat':
        return <Route {...rest} />
      case 'app':
        return <Route {...rest} />
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
