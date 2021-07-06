import { lazy } from 'react';

export const routes = [
    {
        path: '/',
        component: lazy(() => import(/* webpackChunkName: "Home" */ '../container/Home')),
        exact: true,
    },
    {
        path: '/shop',
        component: lazy(() => import(/* webpackChunkName: "Shop" */ '../container/Shop')),
        
    },
    {
        path: '/auth',
        component: lazy(() => import(/* webpackChunkName: "Auth" */ '../container/Auth')),
    },
    {
        path: '/user/profile',
        component: lazy(() => import(/* webpackChunkName: "Profile" */ '../container/User/Profile')),
        isProtected: true,
    }
];