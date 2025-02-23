import { IBook } from '@/interface/book';
import { createSlice } from '@reduxjs/toolkit';

export interface IShoppingCart {
    bookItem: IBook;
    count: number;
    checked: boolean;
}

export interface IShoppingCartState {
    shoppingCarts: IShoppingCart[];
}
export const stashName = 'shoppingCartData';
const initialState: IShoppingCartState = {
    shoppingCarts: JSON.parse(localStorage.getItem(stashName) ?? '[]'),
};
export const shoppingCartManageSlice = createSlice({
    name: 'shoppingCart',
    initialState: initialState,
    reducers: {
        addShoppingCart(state, action) {
            const index = state.shoppingCarts.findIndex(
                (item) => item.bookItem.id === action.payload.shoppingCart.bookItem.id,
            );
            if (index !== -1) {
                state.shoppingCarts[index].count += action.payload.shoppingCart.count;
                state.shoppingCarts = [...state.shoppingCarts];
                return;
            }
            state.shoppingCarts = [...state.shoppingCarts, action.payload.shoppingCart];
        },
        deleteShoppingCart(state, action) {
            state.shoppingCarts = state.shoppingCarts.filter((item) => item.bookItem.id !== action.payload.id);
        },
        selectAllShoppingCart(state, action) {
            state.shoppingCarts = state.shoppingCarts.map((item) => {
                return { ...item, checked: action.payload.checked };
            });
        },
        selectShoppingCart(state, action) {
            const index = state.shoppingCarts.findIndex((item) => item.bookItem.id === action.payload.id);
            state.shoppingCarts[index].checked = action.payload.checked;
            state.shoppingCarts = [...state.shoppingCarts];
        },
        changeShoppingCartCount(state, action) {
            const index = state.shoppingCarts.findIndex((item) => item.bookItem.id === action.payload.id);
            state.shoppingCarts[index].count = action.payload.count;
            state.shoppingCarts = [...state.shoppingCarts];
        },
    },
});

export const {
    addShoppingCart,
    deleteShoppingCart,
    selectShoppingCart,
    selectAllShoppingCart,
    changeShoppingCartCount,
} = shoppingCartManageSlice.actions;
export const shoppingCartReducer = shoppingCartManageSlice.reducer;
export const shoppingCartStoreName = 'shoppingCart';
