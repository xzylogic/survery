import React from 'react';
import { Link } from 'react-router-dom';

import './Implant.css';
// import {updateCurrentPage} from "../../Store/actions/global.action";

class Implant extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    {document.title = "调查知情说明"}
    return (
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
          <ul style={{width:'100%',marginTop:'2.5rem',textAlign:'center'}}>
            <li className="white_btn" style={{width:'40%',height:'6.6%',display:'inline-block'}}>
              <Link to='/un_implants' className="blueColor">拒绝</Link>
            </li>
            <li className="blue_btn" style={{width:'40%',height:'6.6%',display:'inline-block',marginLeft:'0.5rem'}}>
              <Link to='/querys/0' className="whiteColor">同意</Link>
            </li>
          </ul>
        </div>
    )
  }
}

export default Implant;
