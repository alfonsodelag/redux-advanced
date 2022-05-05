import { configureStore } from '@reduxjs/toolkit'

import uiSlice from './ui-slice';
import cartSlice from './cart-slice';

// ! We import configure store from Redux. ConfigureStore wants an object where we set up our "root reducer"
const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        cart: cartSlice.reducer
    }
});

export default store;