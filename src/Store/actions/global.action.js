export const actionTypes = {
  UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
  GET_CURRENT_PAGE: 'GET_CURRENT_PAGE'
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