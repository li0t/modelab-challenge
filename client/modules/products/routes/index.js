/**
 * Products routes module.
 *
 * @module products/routes
 */

export default [
  {
    component: () => import('../pages/index'),
    path: '/products',
    name: 'products',
    meta: {
      rule: {
        action: 'read',
        model: 'Product'
      }
    }
  }
];
