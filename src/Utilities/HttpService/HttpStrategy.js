import * as axios from 'axios'

import { CODE } from '../status-code'

function getStrategy(url, config = {}) {
  return axios.get(encodeURI(url), config).then(res => res && res.data).then(res => {
    if (res.code == CODE.SUCCESS) {
      return res.data || res.msg || true
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

function postStrategy(url, data = {}, config = {}) {
  return axios.post(url, data, config).then(res => res && res.data).then(res => {
    if (res.code == CODE.SUCCESS) {
      return res.data || res.msg || true
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

export const HttpStrategy = {
  get: getStrategy,
  post: postStrategy
}
