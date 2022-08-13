import { Route, Router } from './utils/Router';

import { Default } from './layout/default';

const routes: Route[] = [
  {
    path: '/',
    component: Default,
    props: {
      outlet: () => import('./pages/signin'),
    },
  },
  {
    path: '/messenger',
    component: Default,
    props: {
      outlet: () => import('./pages/home'),
      outletProp: { route: '/messenger' },
    },
  },
  {
    path: '/settings',
    component: Default,
    props: {
      outlet: () => import('./pages/home'),
      outletProp: { route: '/settings' },
    },
  },
  {
    path: '/profile',
    component: Default,
    props: {
      outlet: () => import('./pages/home'),
      outletProp: { route: '/profile' },
    },
  },
  {
    path: '/sign-up',
    component: Default,
    props: {
      outlet: () => import('./pages/signup'),
    },
  },
  {
    path: '*',
    component: Default,
    props: {
      outlet: () => import('./pages/error'),
      outletProp: { title: '404 Page Not Found' },
    },
  },
];

export const router = new Router(routes, '#root');
