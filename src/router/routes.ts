import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        // TODO: Support /join?id=... links by redirecting straight to call
        path: 'join',
        component: () => import('pages/Join.vue')
      },
      { path: 'start', component: () => import('pages/Start.vue') },
    ],
  },
  {
    path: '/call',
    component: () => import('layouts/CallLayout.vue'),
    beforeEnter: to => {
      if (!to.query.id) return false;
    },
    props: route => ({ id: route.query.id, pwd: route.query.pwd }),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
