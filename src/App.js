import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './App.css'

import { routeConfig } from './routeConfig'
import { GetArgsFromHref } from './Utilities'
import { getUserInfo } from './Store/actions/global.action'

class PrivateRoute extends React.Component {
  componentWillMount() {
    const { store, type, location } = this.props
    switch(type) {
      case 'wechat':
        const code = GetArgsFromHref(location.search, 'code')
        const openId = window.localStorage.getItem('openId')
        store.dispatch(getUserInfo('wechat', openId, code))
        return
      case 'app':
        const userId = GetArgsFromHref(location.search, 'userId')
        store.dispatch(getUserInfo('app', userId))
        return
      default:
        return
    }
  }

  render() {
    const { type, store, ...rest } = this.props
    console.log(Object.keys(store.globalReducer.userInfo).length)
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
    return (
      <Router basename='/survey'>
        <Switch>
          { routeConfig.map((route, i) => <PrivateRoute key={i} {...route} type='wechat' store={this.props} />) }
        </Switch>
      </Router>
    )
  }
}

export default connect(state => state)(App)
