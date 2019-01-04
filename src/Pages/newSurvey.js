import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SurveyComponent from '../Components/newSurvey/SurveyComponent'
import {surveyGetLocalAction} from "../Store/actions/survey.action";


class Survey extends React.Component {

  componentDidMount() {
    const store = this.props;
    store.dispatch(surveyGetLocalAction());
  }

  render() {
    return <SurveyComponent />
  }
}

export default withRouter(connect(state => state)(Survey))