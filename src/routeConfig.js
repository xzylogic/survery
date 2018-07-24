import Home from './Pages/Home'
import About from './Pages/About'

export const routeConfig = [{
  path: '/',
  component: Home,
  exact: true
}, {
  path: '/about',
  component: About
}]
