import { useShoppingCartSelector } from '@/redux/adapater/useShoppingCartSelector';
import styles from './scss/index.module.scss';
import { ShoppingCartItem } from '@/components';
import { useNavigate } from 'react-router-dom';
import { basePath } from '@/router/router';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { selectAllShoppingCart } from '@/redux/slice/shoppingCart';
export const ShoppingCart = () => {
    const { shoppingCarts } = useShoppingCartSelector();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goBack = () => {
        navigate(basePath);
    };
    const isSelectAll = useMemo(() => {
        return shoppingCarts.every((cart) => cart.checked);
    }, [shoppingCarts]);
    const onSelectAllChange = () => {
        dispatch(selectAllShoppingCart({ checked: !isSelectAll }));
    };
    const totalPrice = useMemo(() => {
        const price = shoppingCarts.reduce((prev, current) => {
            if (current.checked) {
                return prev + current.bookItem.price * current.count;
            }
            return prev;
        }, 0);
        return price.toFixed(2);
    }, [shoppingCarts]);
    return (
        <div className={styles['shopping_cart_page']}>
            <h2>Shopping Cart</h2>
            {shoppingCarts.length === 0 ? (
                <div className={styles['empty_cart']}>
                    <h2>Empty Cart</h2>
                    <p onClick={goBack} style={{ cursor: 'pointer' }}>
                        Go to View Books
                    </p>
                </div>
            ) : (
                <div className={styles['select_all']}>
                    <input type="checkbox" checked={isSelectAll} onChange={onSelectAllChange} />
                    Select All
                </div>
            )}

            <div className={styles['cart_list']}>
                {shoppingCarts.map((cart, index) => {
                    return (
                        <ShoppingCartItem
                            key={'shoppingCart' + cart.bookItem.id}
                            book={cart.bookItem}
                            checked={cart.checked}
                            count={cart.count}
                        ></ShoppingCartItem>
                    );
                })}
            </div>
            {shoppingCarts.length > 0 && (
                <div className={styles['pay_btn']}>
                    <div>Pay ${totalPrice}</div>
                </div>
            )}
        </div>
    );
};
