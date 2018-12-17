import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SurveyComponent from '../Components/Survey/SurveyComponent'
import {surveyGetLocalAction, exportExcel} from "../Store/actions/survey.action";


class Survey extends React.Component {

  componentDidMount() {
    const store = this.props;
    store.dispatch(surveyGetLocalAction());
    store.dispatch(exportExcel());
  }

  render() {
    return <SurveyComponent />
  }
}

export default withRouter(connect(state => state)(Survey))