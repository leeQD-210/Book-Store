import { useSelector } from 'react-redux';
import { IShoppingCartState } from '../slice/shoppingCart';

export const useShoppingCartSelector = () => {
    return useSelector((state: { shoppingCart: IShoppingCartState }) => {

        return state.shoppingCart;
    });
};
