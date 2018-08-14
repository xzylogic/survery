import React from 'react';
import { connect } from 'react-redux';
import { Progress, Button } from 'antd-mobile';

import QuestionComponent from './Question/QuestionComponent';
import { loadQuestionsAction, surveyGetLocalAction, saveSurveyAction } from '../../Store/actions/global.action';

const formatData = (data) => {
    let keys = Object.keys(data)
    let arr = []
    keys.forEach(key => {
      arr.push({
        id: key,
        score: data[key]
      })
    })
   return  arr
}

class Index extends React.Component {

  componentWillMount() {
    const store = this.props;
    const { questions } = store.globalReducer;
    if (Array.isArray(questions) && questions.length === 0) {
      store.dispatch(loadQuestionsAction());
    }

    store.dispatch(surveyGetLocalAction())
  }

  handleSubmit = () => {
    const store = this.props;
    const { inputValue } = store.globalReducer;
    let submitData = Object.assign({}, inputValue)
    if (submitData.saq) {
      submitData.saq = formatData(submitData.saq)
    }
    if (submitData.sf) {
      submitData.sf = formatData(submitData.sf)
    }
    if (submitData.phq) {
      submitData.phq = formatData(submitData.phq)
    }
    if (submitData.eq) {
      submitData.eq = formatData(submitData.eq)
    }
    submitData.userId = '2419';
    console.log(submitData)
    store.dispatch(saveSurveyAction(submitData))
  }
 
  render() {
    const { globalReducer } = this.props;
    const { questions } = globalReducer;
    const id = Number(this.props.match.params.id);
    const length = questions && questions.length;
    let percent = Math.round(parseFloat(id / length * 100));
    if ( percent >= 100 ) {
      percent = 100;
    }
    document.title = `已完成 ${percent}%`;
    return id !== length ? (
      <div className='title'>
        <div className="progress-container" style={{marginTop:'0.36rem',height:'0.36rem'}}>
          <Progress percent={percent} position="normal" style={{borderRadius:'1rem'}}/>
      </div>        
        {
          <QuestionComponent question={questions[id]} id={id} percent={percent} /> 
        }
      </div>
    ) : (
      <div className="title">    
        <div className="query_end">
          <img src="" alt="调查完成"/>
          <p>调查已完成，感谢你的参与。</p>
          <Button type='primary' onClick={this.handleSubmit}>确定</Button>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Index);
