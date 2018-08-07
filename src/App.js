import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { routeConfig } from './routeConfig';
import { updateCurrentPage } from './Store/actions/global.action';
import './App.css';
import Implants from "./Pages/Implants";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isImplants : true,
    };
  }
  componentDidMount() {
    console.log(this.props);
    const store = this.props;
    store.dispatch(updateCurrentPage('/implants'));
  }
  implantsHandler = () => {
    this.setState({
      isImplants : !this.state.isImplants,
    });
  };
  unImplantsHandler = () => {
    return null;
  };
  render() {
    const app_text = {
      width:'5.86rem',
      height:'1rem',
      textAlign: 'center',
      fontSize: '0.36rem',
      color: '#666666',
      margin: '1.04rem auto 0',
    };
    const setTitle = (title) => document.title = title;
    let app_content=null;
    if(this.state.isImplants){
      app_content = (
        <Router>
          <div>
            <p style={app_text}>本次调查<br/>仅针对曾植入过心脏支架的用户</p>
            <ul>
              <li onClick={this.implantsHandler} className="blue_btn" style={{marginTop:'0.64rem'}}>
                <Link to='/implants' className="whiteColor">已植入</Link>
              </li>
              <li onClick={this.unImplantsHandler} className="white_btn" style={{marginTop:'0.52rem'}}>
                <Link to='/un_implants' className="blueColor">未植入</Link>
              </li>
            </ul>
            { routeConfig.map((route, i) => <Route key={i}  onEnter={setTitle('调查知情说明')} {...route} />) }
          </div>
        </Router>
      )
    }
    return (
      <React.Fragment>
        {this.state.isImplants ? app_content : <Implants/>}
      </React.Fragment>
    );
  }
}

export default connect(state => state)(App);
