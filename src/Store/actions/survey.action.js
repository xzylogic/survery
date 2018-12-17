export const actionTypes = {
  SUBMIT_AGREEMENT: 'SUBMIT_AGREEMENT',
  UPDATE_INPUT_VALUE: 'UPDATE_INPUT_VALUE',
  APPEND_INPUT_VALUE: 'APPEND_INPUT_VALUE',
  SAVE_SURVEY: 'SAVE_SURVEY',
  SURVEY_STORE_LOCAL: 'SURVEY_STORE_LOCAL',
  SURVER_GET_LOCAL: 'SURVER_GET_LOCAL',
  SURVER_UPDATE_LOCAL: 'SURVER_UPDATE_LOCAL',
  EXPORT_EXCEL: 'EXPORT_EXCEL',
}

export const submitAgreementAction = () => {
  return {
    type: actionTypes.SUBMIT_AGREEMENT
  }
}

export const surveyGetLocalAction = () => {
  return {
    type: actionTypes.SURVER_GET_LOCAL,
  }
}

export const surveyStoreLocalAction = (option, key, value, id, i) => {
  return {
    type: actionTypes.SURVEY_STORE_LOCAL,
    key: key,
    value: value,
    id: id,
    i: i,
    option: option
  }
}

export const surveyUpdateLocalAction = (data) => {
  return {
    type: actionTypes.SURVER_UPDATE_LOCAL,
    data: data
  }
}

export const updateInputValueAction = (key, value) => {
  return {
    type: actionTypes.UPDATE_INPUT_VALUE,
    key: key,
    value: value
  }
}

export const appendInputValueAction = (key, value, id, i) => {
  return {
    type: actionTypes.APPEND_INPUT_VALUE,
    key: key,
    value: value,
    id: id,
    i: i,
  }
}

export const saveSurveyAction = (data, callback, errorHandler) => {
  return {
    type: actionTypes.SAVE_SURVEY,
    data: data,
    callback: callback,
    errorHandler: errorHandler
  }
}

export const exportExcel = () => {
  return {
    type: actionTypes.EXPORT_EXCEL,
  }
}