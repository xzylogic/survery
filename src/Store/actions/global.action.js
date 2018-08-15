export const actionTypes = {
  UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
  UPDATE_USERID: 'UPDATE_USERID',
  UPDATE_OPENID: 'UPDATE_OPENID',
  SAVE_CURRENT_PAGE: 'SAVE_CURRENT_PAGE',
  GET_CURRENT_PAGE: 'GET_CURRENT_PAGE',
  LOAD_QUESTIONS: 'LOAD_QUESTIONS',
  UPDATE_QUESTIONS: 'UPDATE_QUESTIONS',
  SUBMIT_AGREEMENT: 'SUBMIT_AGREEMENT',
  UPDATE_INPUT_VALUE: 'UPDATE_INPUT_VALUE',
  APPEND_INPUT_VALUE: 'APPEND_INPUT_VALUE',
  SAVE_SURVEY: 'SAVE_SURVEY',
  SURVEY_STORE_LOCAL: 'SURVEY_STORE_LOCAL',
  SURVER_GET_LOCAL: 'SURVER_GET_LOCAL',
  SURVER_UPDATE_LOCAL: 'SURVER_UPDATE_LOCAL',
  GET_USER_INFO: 'GET_USER_INFO',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO'
}

export const updateCurrentPageAction = (data) => {
  return {
    type: actionTypes.UPDATE_CURRENT_PAGE,
    data: data
  }
}

export const updateUserIdAction = (data) => {
  return {
    type: actionTypes.UPDATE_USERID,
    data: data
  }
}

export const updateOpenIdAction = (data) => {
  return {
    type: actionTypes.UPDATE_OPENID,
    data: data
  }
}

export const saveCurrentPageAction = (data) => {
  return {
    type: actionTypes.SAVE_CURRENT_PAGE,
    data: data
  }
}

export const getCurrentPageAction = () => {
  return {
    type: actionTypes.GET_CURRENT_PAGE
  }
}

export const loadQuestionsAction = () => {
  return {
    type: actionTypes.LOAD_QUESTIONS
  }
}

export const updateQuestionsAction = (data) => {
  return {
    type: actionTypes.UPDATE_QUESTIONS,
    data: data
  }
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

export const surveyStoreLocalAction = (option, key, value, id) => {
  return {
    type: actionTypes.SURVEY_STORE_LOCAL,
    key: key,
    value: value,
    id: id,
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

export const appendInputValueAction = (key, value, id) => {
  return {
    type: actionTypes.APPEND_INPUT_VALUE,
    key: key,
    value: value,
    id: id
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

export const getUserInfo = (agent, id, code) => {
  return {
    type: actionTypes.GET_USER_INFO,
    agent: agent,
    id: id,
    code: code
  }
}

export const updateUserInfo = (data) => {
  return {
    type: actionTypes.UPDATE_USER_INFO,
    data: data
  }
}
