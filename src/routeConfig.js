import Home from './Pages/Home/Home';
import Implant from './Pages/Implant/Implant';
import Un_implants from './Pages/Un_implants';
import Querys from './Pages/Querys/Querys';
import Survey from './Pages/Survey/Survey'

// const setTitle = (title) => document.title = title;
export const routeConfig = [{
  path: '/',
  component: Home,
  exact: true,
}, {
  path: '/implant',
  component: Implant,
}, {
  path: '/un_implants',
  component: Un_implants,
},{
  path: '/querys/:id',
  component: Survey,
}];
