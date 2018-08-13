import React from 'react';
import { Link } from 'react-router-dom';

import { updateCurrentPage } from '../../Store/actions/global.action';

class Home extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    {document.title = "问卷调查"}
    const app_text = {
      width:'5.86rem',
      height:'1rem',
      textAlign: 'center',
      fontSize: '0.36rem',
      color: '#666666',
      margin: '1.04rem auto 0',
    };
    return (
        <div>
          <p style={app_text}>本次调查<br/>仅针对曾植入过心脏支架的用户</p>
          <ul>
            <li className="blue_btn" style={{marginTop:'0.64rem'}}>
              <Link to='/implant' className="whiteColor">已植入</Link>
            </li>
            <li className="white_btn" style={{marginTop:'0.52rem'}}>
              <Link to='/un_implants' className="blueColor">未植入</Link>
            </li>
          </ul>
        </div>
    );
  }
}

export default Home;
