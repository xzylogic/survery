import Home from './Pages/Home'
import Question from './Pages/Question'
import Success from './Pages/Success'

export const routeConfig = [{
  path: '/',
  component: Home,
  exact: true,
}, {
  path: '/question/:id',
  component: Question,
}, {
  path: '/success',
  component: Success,
}]
