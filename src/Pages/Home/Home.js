import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { routeConfig } from '../../routeConfig';
import { updateCurrentPage } from '../../Store/actions/global.action';
// import Implants from "../Implants";

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isImplants : true,
    };
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
    return (
        <Router>
          <div>
            <p style={app_text}>本次调查<br/>仅针对曾植入过心脏支架的用户</p>
            <ul>
              <li className="blue_btn" style={{marginTop:'0.64rem'}}>
                <Link to='/implants' className="whiteColor">已植入</Link>
              </li>
              <li className="white_btn" style={{marginTop:'0.52rem'}}>
                <Link to='/un_implants' className="blueColor">未植入</Link>
              </li>
            </ul>
            {/*{ routeConfig.map((route, i) => <Route key={i}  onEnter={setTitle('调查知情说明')} {...route} />) }*/}
          </div>
        </Router>
    );
  }
}

export default Home;
