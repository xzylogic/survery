import React from 'react';
import {Button} from 'antd-mobile';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { routeConfig } from '../routeConfig';
import Querys from './Querys/Querys';
import './Implants.css';

class Implants extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      agree : true,
      querys: []
    }
  }
  agreeHandler = () => {
    // this.setState({
    //   agree : !this.state.agree,
    // });
    //请求JSON数据
    fetch('../Querys.json')
      .then(res => res.json())
      .then(data => {this.setState({agree : !this.state.agree,querys:data})})
      .catch(e => {console.log(e)});
  };
  render() {

    let imp_content=null;
    if(this.state.agree){
      imp_content = (
        <Router>
          <div>
            <p className="explain">此次调查主要目的是了解冠心病支架术后人群的生活质量特征，探讨处于术后不同病程阶段的生活质量变化趋势。在调查过程中，我们将严格遵守保护个人的私密信息，任何文章或调查研究结果中，不会出现姓名、住院号等个人信息，也严禁任何人公开或是用于商业行为。
              <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              调查表一人一卷，以现场问卷方式和网络填写为主，取得填表人同意后，住院期间收回纸质问卷，电子问卷直接进入数据库留存。
            </p>
            <div className="unit">
              <p><strong>调查单位:</strong></p>
              <p>上海交通大学医学院附属瑞金医院 心脏科</p>
              <p>上海交通大学医学院 公共卫生学院</p>
            </div>
            <div style={{width:'100%',marginTop:'2.6rem',textAlign:'center'}}>
              <button onClick={this.agreeHandler} className="white_btn blueColor"
                      style={{width:'40%',height:'6.6%',display:'inline-block'}}>拒绝</button>
              <button onClick={this.agreeHandler.bind(this)} className="blue_btn whiteColor"
                      style={{width:'40%',height:'6.6%',marginLeft:'0.5rem',display:'inline-block'}}>同意</button>
            </div>
            {/*{ routeConfig.map((route, i) => <Route key={i} {...route} />) }*/}
          </div>
        </Router>
      )
    }
    return (
      <React.Fragment>
        {this.state.agree ? imp_content : <Querys querys={this.state.querys}/>}
      </React.Fragment>
    )
  }
}

export default Implants;
