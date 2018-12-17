import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {exportExcel} from "../Store/actions/survey.action";


class ExportExcel extends React.Component {

  componentDidMount() {
    const store = this.props;
    store.dispatch(exportExcel());
  }

  render() {
    return null;
  }
}

export default withRouter(connect(state => state)(ExportExcel))