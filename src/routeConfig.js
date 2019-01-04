// import Home from './Pages/Home'
import Question from './Pages/Question'
import Success from './Pages/Success'
import surveySuccess from './Pages/surveySuccess'
import ExportExcel from './Pages/ExportExcel'
// import Survey from './Pages/Survey'
import newSurvey from './Pages/newSurvey'
import Error from './Pages/Error'

export const routeConfig = [{
  path: '/',
  component: newSurvey,
  // component: Survey,
  // component: Home,
  exact: true,
}, {
  path: '/question/:id',
  component: Question,
}, {
  path: '/success',
  component: Success,
}, {
  path: '/newSurvey',
  // path: '/survey',
  // component: Survey,
  component: newSurvey,
}, {
  path: '/surveySuccess',
  component: surveySuccess,
}, {
  path: '/exportExcel',
  component: ExportExcel,
}]

export const staticRouteConfig = [{
  path: '/error',
  component: Error
}]