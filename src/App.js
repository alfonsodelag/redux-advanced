import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCardData, fetchCartData } from './store/cart-actions';

let isInitial = true;

// ! A Thunk is a function that delays an action until later. Instead, it returns another function which eventually returns the action so we can run other code,
// ! before we then dispatch the actual action object that we did want to create.

function App() {

  // ! REMEMBER, dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change. 
  const dispatch = useDispatch();

  // ! REMEMBER: useSelector SETS UPS A SUBSCRIPTION TO REDUX, SO WHENEVER OUR STORE CHANGES, THIS COMPONENT WILL BE RE-EXECUTED AND WE WILL GET THE LATEST STATE
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  // ! We use useEffect to watch for changes inour cart state
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {

    if (isInitial) {
      isInitial = false
      return;
    }

    if (cart.changed) {
      // ! Here we use sendCardData as an action creator. 
      dispatch(sendCardData(cart));
    }

  }, [cart, dispatch]);

  return (
    <>
      {notification &&
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );

}

export default App;