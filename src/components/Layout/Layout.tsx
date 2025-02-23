import { ReactNode, useMemo } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import styles from './scss/index.module.scss';
import { basePath } from '@/router/router';
import { useShoppingCartSelector } from '@/redux/adapater/useShoppingCartSelector';

export const Layout = (params: { children: ReactNode }) => {
    const { children } = params;
    const navigate = useNavigate();
    const onShoppingCartClick = () => {
        navigate(basePath + '/shoppingCart');
    };
    const { shoppingCarts } = useShoppingCartSelector();
    console.log(shoppingCarts)
    const cartCount = useMemo(() => {
        return shoppingCarts.reduce((prev, current) => {
            if (current.checked) {
                return prev + 1;
            }
            return prev;
        }, 0);
    }, [shoppingCarts]);
    return (
        <div className={styles['layout']}>
            <div className={styles['layout_header']}>
                <div className={styles['left_wrap']}>
                    <div className={styles['logo']} onClick={() => navigate(basePath)}>
                        <h1>Book Store</h1>
                    </div>
                </div>
                <div className={styles['right_wrap']}>
                    <div className={styles['cart_icon']} onClick={onShoppingCartClick}>
                        <i className="iconfont icon-gouwuchekong"></i>
                        {cartCount > 0 && <div className={styles['cart_count']}>{cartCount}</div>}
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};
