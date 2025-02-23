import { configureStore } from '@reduxjs/toolkit';
import { shoppingCartStoreName, shoppingCartReducer, stashName } from './slice/shoppingCart';
const store = configureStore({
    reducer: {
        [shoppingCartStoreName]: shoppingCartReducer,
    },
});

store.subscribe(() => {
    try {
        const state = store.getState();
        const serializedState = JSON.stringify(state[shoppingCartStoreName]['shoppingCarts']);
        localStorage.setItem(stashName, serializedState);
    } catch (err) {
        console.error('Failed to save state to localStorage:', err);
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
