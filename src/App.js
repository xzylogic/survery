import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { routeConfig } from './routeConfig';
import { updateCurrentPage } from './Store/actions/global.action';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    console.log(this.props);
    const store = this.props;
    store.dispatch(updateCurrentPage('/about'));
  }
  render() {
    return (
        <Router>
          <Switch>
            { routeConfig.map((route, i) => <Route key={i} {...route} />) }
          </Switch>
        </Router>
    );
  }
}

export default connect(state => state)(App)
