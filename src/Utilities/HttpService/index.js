import HttpHandler from './HttpHandler'
import { HttpStrategy } from './HttpStrategy'
import { ToastError, HandlerError } from './ErrorStrategy'

export const HttpToastService = new HttpHandler(HttpStrategy, ToastError)
export const HttpHandlerService = new HttpHandler(HttpStrategy, HandlerError)
