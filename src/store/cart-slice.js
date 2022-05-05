import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({

    // ! You MUST WRITE each "key" of the createSlice object like "name", "initialState", "reducers"
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    // ! The reducers key is a map of all the methods that represent all the different actions we want to handle with that reducer
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        // ! REMEMBER, NEVER RUN ANY ASYNCHRONOUS CODE IN YOUR REDUCERS!!! IF YOU WANT TO DO IT, YOU MUST DO IT IN THE COMPONENT, OR USE AN "ACTION CREATOR", WHICH WILL
        // ! ALLOW US TO USE ASYNCHRONOUS CODE

        // ! Remember, the "action" argument carries extra information. 

        // ! Whenever our cart changes we send an HTTP request and we keep our logic for updating the Redux Store, because we simply switch the order. We first
        // ! we first update our redux store and then we select the updated store to send the request
        addItemToCart(state, action) {
            // ! I think here we're saying that "newItem" will be literally the action.payload
            const newItem = action.payload;
            // ! I want to get my existingItem by reaching out to the state items and finding the item where the item.id is equal to newItem.id
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            // ! if the existingItem doesn't exist (or it's "false"), then go to the state.items array and push into it a new item. 
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                // ! if the item already exists....

                // ! Update the existing item
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
            console.log(newItem) // ! Will print an object like { id: 'p1', title: 'My First Book', price: 6 }
            console.log("existingItem", existingItem)
        },

        removeItemFromCart(state, action) {
            // ! When removing the item from the Cart...

            // ! We are expecting the payload to be the id of the item, because we are defining it this way
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                // ! If the qty is 1 we want to remove the item from the array, and we do it by filtering out the item we want to remove, and this will overwrite,
                // ! this will overwrite the array of items with a new array where this item will be missing. It will be missing because we filter for the item where 
                // ! the item.id is not equal to the id 
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;