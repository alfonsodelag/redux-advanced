import { uiActions } from "./ui-slice";

import { cartActions } from './cart-slice';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {

            const response = await fetch('https://redux-4f111-default-rtdb.firebaseio.com/cart.json')

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();

            return data;
        };

        try {

            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));

        } catch (error) {
            console.log("error", error)
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error...',
                    message: 'Fetching cart data failed!'
                })
            );
        }
    }
}

export const sendCardData = (cart) => {
    return async (dispatch) => {

        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending card Data!'
            })
        )

        const sendRequest = async () => {

            // ! We target a cart.json node. The ".json" is Firebase specific. This will create a new "cart" Node in the database and store the data there
            const response = await fetch('https://redux-4f111-default-rtdb.firebaseio.com/cart.json',
                {
                    // ! PUT requests are also allowed by Firebase, but the new data won't be added in a list of data, but rather will overwrite the existing cart with
                    // ! the upcoming data.
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity
                    }),
                });

            if (!response.ok) {
                throw new Error('Sending card data failed');
            }
        };


        try {

            await sendRequest();

            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success...',
                    message: 'Sending card data succesfully!'
                })
            )


        } catch (error) {
            console.log("error: sending card data failed", error);
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error...',
                    message: 'Error sending card data failed!'
                })
            );

        }
    }
}