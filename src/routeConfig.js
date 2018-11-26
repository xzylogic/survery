// import Home from './Pages/Home'
import Question from './Pages/Question'
import Success from './Pages/Success'
import surveySuccess from './Pages/surveySuccess'
import Survey from './Pages/Survey'
import Error from './Pages/Error'

export const routeConfig = [{
  path: '/',
  component: Survey,
  // component: Home,
  exact: true,
}, {
  path: '/question/:id',
  component: Question,
}, {
  path: '/success',
  component: Success,
}, {
  path: '/survey',
  component: Survey,
}, {
  path: '/surveySuccess',
  component: surveySuccess,
}]

export const staticRouteConfig = [{
  path: '/error',
  component: Error
}]