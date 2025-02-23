import { HomePage } from '@/pages/Home';
import { ShoppingCart } from '@/pages/ShoppingCart';
export const basePath = '/bookStore';
export const routes = [
    {
        path: '/',
        component: HomePage,
        exact: false,
        name: 'Home',
    },
    {
        path: '/shoppingCart',
        component: ShoppingCart,
        exact: true,
        name: 'ShoppingCart',
    },
    {
        path: '',
        component: HomePage,
        exact: false,
    },
];
