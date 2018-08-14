export const actionTypes = {
  UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
  GET_CURRENT_PAGE: 'GET_CURRENT_PAGE',
  LOAD_QUESTIONS: 'LOAD_QUESTIONS',
  UPDATE_QUESTIONS: 'UPDATE_QUESTIONS',
  UPDATE_INPUT_VALUE: 'UPDATE_INPUT_VALUE',
  APPEND_INPUT_VALUE: 'APPEND_INPUT_VALUE',
  SAVE_SURVEY: 'SAVE_SURVEY',
  SURVEY_STORE_LOCAL: 'SURVEY_STORE_LOCAL',
  SURVER_GET_LOCAL: 'SURVER_GET_LOCAL',
  SURVER_UPDATE_LOCAL: 'SURVER_UPDATE_LOCAL',
  GET_USER_INFO: 'GET_USER_INFO',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO'
};

/**
 * 更新登录返回页面
 * @param {*} data { currentPage: string }
 */
export const updateCurrentPage = (data) => {
  return {
    type: actionTypes.UPDATE_CURRENT_PAGE,
    data: data
  }
};

/**
 * 从 localStorge 中获取登录返回页面
 */
export const getCurrentPage = () => {
  return {
    type: actionTypes.GET_CURRENT_PAGE
  }
};

/**
 * 
 */
export const loadQuestionsAction = () => {
  return {
    type: actionTypes.LOAD_QUESTIONS
  }
};

/**
 * 
 */
export const updateQuestionsAction = (data) => {
  return {
    type: actionTypes.UPDATE_QUESTIONS,
    data: data
  }
};

/**
 * 
 */
export const surveyGetLocalAction = () => {
  return {
    type: actionTypes.SURVER_GET_LOCAL,
  }
};

/**
 * 
 */
export const surveyStoreLocalAction = (option, key, value, id) => {
  return {
    type: actionTypes.SURVEY_STORE_LOCAL,
    key: key,
    value: value,
    id: id,
    option: option
  }
};
/**
 * 
 */
export const surveyUpdateLocalAction = (data) => {
  return {
    type: actionTypes.SURVER_UPDATE_LOCAL,
    data: data
  }
};

/**
 * 
 */
export const updateInputValueAction = (key, value) => {
  return {
    type: actionTypes.UPDATE_INPUT_VALUE,
    key: key,
    value: value
  }
};

/**
 * 
 */
export const appendInputValueAction = (key, value, id) => {
  return {
    type: actionTypes.APPEND_INPUT_VALUE,
    key: key,
    value: value,
    id: id
  }
};


/**
 * 
 */
export const saveSurveyAction = (data) => {
  return {
    type: actionTypes.SAVE_SURVEY,
    data: data
  }
};

/**
 *
 */
export const getUserInfo = (data) => {
  return {
    type: actionTypes.GET_USER_INFO,
    data: data
  }
};

/**
 *
 */
export const updateUserInfo = (data) => {
  return {
    type: actionTypes.UPDATE_USER_INFO,
    data: data
  }
};
