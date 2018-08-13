import React from 'react';
import { connect } from 'react-redux';
import { Progress } from 'antd-mobile';

import QuestionComponent from './Question/QuestionComponent';
import { loadQuestionsAction } from '../../Store/actions/global.action';

class Index extends React.Component {

  componentWillMount() {
    const store = this.props;
    const { questions } = store.globalReducer;
    if (Array.isArray(questions) && questions.length === 0) {
      store.dispatch(loadQuestionsAction());
    }
  }

  render() {
    const { globalReducer } = this.props;
    const { questions } = globalReducer;
    const id = Number(this.props.match.params.id);
    let percent = Math.round(parseFloat(id / 56 * 100));
    if ( percent >= 100 ) {
      percent = 100;
    }
    document.title = `已完成 ${percent}%`;
    return (
      <div className='title'>
        <div className="progress-container" style={{marginTop:'0.36rem',height:'0.36rem'}}>
          <Progress percent={percent} position="normal" style={{borderRadius:'1rem'}}/>
        </div>        
        {
          <QuestionComponent question={questions[id]} id={id} percent={percent} end={id === questions.length - 1} /> 
        }
      </div>
    )
  }
}

export default connect(state => state)(Index);
