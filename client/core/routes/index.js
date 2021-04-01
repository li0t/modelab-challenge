/**
 * Core routes module.
 *
 * @module core/routes
 */

export default [
  {
    path: '/',
    name: 'home',
    redirect: '/products'
  },
  {
    component: () => import('../pages/lost'),
    path: '*',
    name: 'lost'
  }
];
