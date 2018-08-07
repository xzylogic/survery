import Un_implants from './Pages/Un_implants';
import Implants from './Pages/Implants';
import Querys from './Pages/Querys/Querys';

export const routeConfig = [{
  path: '/implants',
  component: Implants,
  exact: true
}, {
  path: '/un_implants',
  component: Un_implants
},{
  path: '/implants/:id',
  component: Querys
}];
