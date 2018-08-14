import { Toast } from 'antd-mobile'

export const ToastError = async (error) => {
  console.log(error.message)
  await Toast.hide()
  await Toast.info(error.message)
}

export const HandlerError = async (error, handler) => {
  console.log(error.message)
  if (!handler || typeof handler !== 'function') {
    throw new Error('Error Handler not defined')
  } else {
    handler(error.message)
  }
}
