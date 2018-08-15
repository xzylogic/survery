import HttpHandler from './HttpHandler'
import { HttpStrategy, HttpOriginStrategy } from './HttpStrategy'
import { ToastError, HandlerError, CatchError } from './ErrorStrategy'

export const HttpToastService = new HttpHandler(HttpStrategy, ToastError)
export const HttpHandlerService = new HttpHandler(HttpStrategy, HandlerError)
export const HttpOriginService = new HttpHandler(HttpOriginStrategy, CatchError)
export const HttpCatchService = new HttpHandler(HttpStrategy, CatchError)
