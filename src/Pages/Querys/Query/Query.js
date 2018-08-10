import React from 'react';
import './Query.css';
import { Progress } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { DatePicker, List } from 'antd-mobile';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
  // set the minDate to the 0 of maxDate
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}
class Query extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue: [],
      checked: false,
      date: now,
      time: now,
      utcDate: utcNow,
      dpValue: null,
      customChildValue: null,
      visible: false,
    }
    this.inputHandler = this.inputHandler.bind(this);
  }
  inputHandler = (e) => {
    let inputValue = e.target.value;
    localStorage.setItem('inputValue'+[this.props.id],inputValue);
  }

  render() {
    let id = this.props.id;//获取当前url参数
    let length = this.props.query.length;
    let index = id;//点击上一题进行判断的参数
    index = index -1;//上一题
    id = id+1;//下一题
    let query_title=null,
        query_content=null,
        query_button = null;//页面显示的内容

    if(index<=0){
      index = 0;
    }


    if(id >= (length+1)){
      return query_content = (<div>调查完成！</div>);
    }else{
      query_title = <p className="title_header">{this.props.query[id-1].title}</p>;
    }


    if(id === 1 || id ===9 || id ===10 || id === 56){
      query_content = <input type="text" className="inputText" defaultValue="" onChange={this.inputHandler}/>
    }else if(id === 2){
      query_content = (
        <div onClick={this.inputHandler}>
          <div className="female">
            <Link to={`/querys/${id}`}>
              <input type="radio" id="female" name="sex" defaultValue="女"/>
              <label htmlFor="female">女</label>
            </Link>
          </div>
          <div className="male">
            <Link to={`/querys/${id}`}>
              <input type="radio" id="male" name="sex" defaultValue="男"/>
              <label htmlFor="male">男</label>
            </Link>
          </div>
        </div>
      )
    }else if(id === 3){
      query_content = (
          <div>
            <div className="date-picker-list" style={{ backgroundColor: 'white' }}>
              <DatePicker
                  mode="date"
                  title="Select Date"
                  extra="Optional"
                  value={this.state.date}
                  onChange={date => this.setState({ date })}
              >
                {/*<List.Item arrow="horizontal">Date</List.Item>*/}
                <input type="text" className="inputText" arrow="horizontal" defaultValue={this.state.date.toISOString().slice(0,10)}/>
              </DatePicker>
            </div>
          </div>
      )
    }else if(id === 4){
      query_content = (
          <div>
            <input type="text" onChange={this.inputHandler} defaultValue=""/>身高
          </div>
      )
    }else if(id === 5){
      query_content = (
          <div>
            <input type="text" onChange={this.inputHandler} defaultValue=""/>体重
          </div>
      )
    }else if(id === 8){
      query_content = (
          <div>
            {
              this.props.query[id-1].option.map((option,index) => {
                if(option.degree === "" || option.degree === null){
                  return null;
                }else{
                  return (
                      <div key={index} onClick={this.inputHandler} className="select">
                          <input type="checkbox" id={'selectCheckBox'+index} defaultValue={option.degree}/>
                          <label htmlFor={'selectCheckBox'+index}>{option.degree}</label>
                      </div>
                  )
                }
              })
            }
          </div>
      )
    }else{
      query_content = (
        <div>
          {
            this.props.query[id-1].option.map((option,index) => {
              if(option.degree === "" || option.degree === null){
                return null;
              }else{
                return (
                    <div key={index} className="select">
                      <Link to={`/querys/${id}`}>
                        <input type="radio" id={'selectRadio'+index} defaultValue={option.degree} onClick={this.inputHandler}/>
                        <label htmlFor={'selectRadio'+index}>{option.degree}</label>
                      </Link>
                    </div>
                )
              }
            })
          }
        </div>
      )
    }

    // 上一题下一题判断
    const btn = {
      width:'100%',
      bottom:'0.52rem',
      display:'flex',
      justifyContent:'center',
      position:'absolute'
    };
    if(id === 1){
      query_button = (
          <ul style={btn}>
            <li className="blue_btn" style={{width:'92%',height:'6.6%'}}>
              <Link to={`/querys/${id}`} className="whiteColor">下一题</Link>
            </li>
          </ul>
      )
    }else if(id === 3 || id ===4 || id === 5 || id === 8 || id === 9 || id === 10 || id === 56){
      query_button = (
          <ul style={btn}>
            <li className="white_btn" style={{width:'40%',height:'6.6%'}}>
              <Link to={`/querys/${index}`} className="blueColor">上一题</Link>
            </li>
            <li className="blue_btn" style={{width:'40%',height:'6.6%'}}>
              <Link to={`/querys/${id}`} className="whiteColor">下一题</Link>
            </li>
          </ul>
      )
    }else{
      query_button = (
          <ul style={btn}>
            <li className="white_btn" style={{width:'92%',height:'6.6%'}}>
              <Link to={`/querys/${index}`} className="blueColor">上一题</Link>
            </li>
          </ul>
      )
    }
    return (
        <div>

          <div className="title">
            <div className="progress-container" style={{marginTop:'0.36rem',height:'0.36rem'}}>
              <Progress percent={this.props.percent} position="normal" style={{borderRadius:'1rem'}}/>
            </div>
            {query_title}
            {query_content}
          </div>
            {query_button}
        </div>
    )
  }
}

export default Query;
