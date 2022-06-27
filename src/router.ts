import { Router } from './utils/Router';

import { Home } from './pages/home';
import { Error } from './pages/error';
import { Signin } from './pages/signin';
import { Signup } from './pages/signup';
import { Default } from './layout/default';

const routes = [
  {
    path: '/',
    component: Default,
    props: {
      outlet: Signin,
    },
  },
  {
    path: '/messenger',
    component: Default,
    props: {
      outlet: Home,
      outletProp: { route: '/messenger' },
    },
  },
  {
    path: '/settings',
    component: Default,
    props: {
      outlet: Home,
      outletProp: { route: '/settings' },
    },
  },
  {
    path: '/profile',
    component: Default,
    props: {
      outlet: Home,
      outletProp: { route: '/profile' },
    },
  },
  {
    path: '/sign-up',
    component: Default,
    props: {
      outlet: Signup,
    },
  },
  {
    path: '*',
    component: Default,
    props: {
      outlet: Error,
      outletProp: { title: '404 Page Not Found' },
    },
  },
];

export const router = new Router(routes, '#root');
