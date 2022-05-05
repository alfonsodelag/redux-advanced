import { createSlice } from '@reduxjs/toolkit';

// ! Create Slice needs an object with the keys
const uiSlice = createSlice({
    name: 'ui',
    // ! When we set notification to null initially, it means that initially we don't have any notification.
    initialState: { cartIsVisible: false, notification: null },

    // ! The reducers key is a map of all the methods that represent all the different actions we want to handle with that reducer
    // ! Remember, when using redux-toolkit, we are not really mutating the state even if it looks like we do. It uses another third party library that creates a new state obj
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
        // ! REMEMBER, Payload is a naming convention for the property that holds the actual data in a Redux action object.
        showNotification(state, action) {
            state.notification = {
                // ! I expect to get the status key from my action.payload
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;