import React from 'react';
import './Query.css';
import { Progress } from 'antd-mobile';

class Query extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id : 0,
      percent: 10,
    }
  }
  queryHandleNext = () => {
    this.setState = {
      id : this.state.id++
    };
    alert("AA")
  };
  add = () => {
    let p = this.state.percent + 10;
    if (this.state.percent >= 100) {
      p = 0;
    }
    this.setState({ percent: p });
  };
  render() {
    const percent = this.state.percent;
    let query_content=null, id=this.state.id;
    if(id === 0){
      query_content = <input type="text" className="inputText" defaultValue=""/>
    }else if(id === 1){
      query_content = (
        <div>
          <input type="radio" name="sex"/>男
          <input type="radio" name="sex"/>女
        </div>
      )
    }else if(id === 2){
      query_content = <input type="text"/>
    }else if(id === 3){
      query_content = (
          <div>
            <input type="text"/>身高
          </div>
      )
    }else{
      query_content = (
        <div>
          {
            this.props.content.map((content,index) => {
              if(content === "" || content === null){
                return null;
              }else{
                return (
                  <div key={index}>
                    <input type="radio"/>{content}
                  </div>
                )
              }
            })
          }
        </div>
      )
    }
    return (
        <div>

          {console.log(id+"=================="+this.state.id)}
          {console.log(this.props.query[this.state.id].title)}
          <div className="title">
            <div className="progress-container" style={{marginTop:'0.36rem',height:'0.36rem'}}>
              <Progress percent={percent} position="normal" style={{borderRadius:'1rem'}}/>
            </div>
            <p className="title_header">{this.props.query[this.state.id].title}</p>
            {query_content}
          </div>
          {
            this.props.query[this.state.id].order.map((order,index) => {
              if(order === "下一题"){
                return <button className="blue_btn whiteColor" key={index}
                               style={{width:'92%',height:'6.6%',lineHeight:'6.6%',bottom:'0.52rem',left:'50%',transform:'translateX(-50%)',position:'absolute'}}
                               onClick={this.queryHandleNext.bind(this)}>{order}</button>
              }else{
                return <button className="white_btn blueColor" key={index}
                               style={{width:'92%',height:'6.6%',lineHeight:'6.6%',bottom:'0.52rem',left:'50%',transform:'translateX(-50%)',position:'absolute'}}
                               onClick={this.queryHandlePrev.bind(this)}>{order}</button>
              }
            })
          }
          {/*<h1>{this.props.title}</h1>*/}
          {/*{query_content}*/}
          {/*{*/}
            {/*this.props.order.map((order,index) => {*/}
              {/*if(order === "上一题"){*/}
                {/*return <button className="blue_btn whiteColor" key={index}>{order}</button>*/}
              {/*}else{*/}
                {/*return <button className="white_btn blueColor" key={index}>{order}</button>*/}
              {/*}*/}
            {/*})*/}
          {/*}*/}
        </div>
    )
  }
}

export default Query;
