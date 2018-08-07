import Home from './Pages/Home/Home';
import Implants from './Pages/Implants';
import Un_implants from './Pages/Un_implants';
import Querys from './Pages/Querys/Querys';

export const routeConfig = [{
  path: '/',
  component: Home,
  exact: true
}, {
  path: '/implants',
  component: Implants,
}, {
  path: '/un_implants',
  component: Un_implants
},{
  path: '/implants/:id',
  component: Querys
}];
