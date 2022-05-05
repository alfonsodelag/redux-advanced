import { uiActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';

const CartButton = (props) => {

  // ! REMEMBER, dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change. 
  const dispatch = useDispatch();

  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
