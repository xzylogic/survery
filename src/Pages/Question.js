import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import QuestionComponent from '../Components/Question/QuestionComponent'
import { loadQuestionsAction, surveyGetLocalAction, saveCurrentPageAction } from '../Store/actions/global.action'

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    const router = this.props.history
    const { questions } = store.globalReducer
    const id = Number(this.props.match.params.id)
    if (Array.isArray(questions) && questions.length === 0) {
      store.dispatch(loadQuestionsAction())
    }
    store.dispatch(surveyGetLocalAction())
    store.dispatch(saveCurrentPageAction(id))
    
    router.listen((route) => {
      const id = !isNaN(Number(route.pathname.split('/')[2])) ? Number(route.pathname.split('/')[2]) : 0
      store.dispatch(saveCurrentPageAction(id))
    })
  }
 
  render() {
    const { globalReducer } = this.props
    const { questions, inputValue, agree } = globalReducer
    const id = Number(this.props.match.params.id)
    const last = questions && questions.length ? questions.length - 1 : 0
    const ifStart = (id === 0)
    const ifEnd = (id === last)
    const percent = last === 0 ? 100 : Math.round(parseFloat(id / (last + 1) * 100))
    document.title = `已完成${percent}%`

    return (
      <React.Fragment>
        {
          questions[id] && inputValue ? 
            <QuestionComponent 
              question={questions[id]} 
              inputValue={inputValue} 
              id={id} 
              percent={percent}
              ifStart={ifStart} 
              ifEnd={ifEnd} 
              agree={agree} 
            /> : ''
        }
    </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(Index))
