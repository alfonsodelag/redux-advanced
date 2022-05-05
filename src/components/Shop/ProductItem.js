import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {

  // ! REMEMBER, dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change. 
  const dispatch = useDispatch();

  const { title, price, description, id } = props;

  const addToCartHandler = () => {

    // ! REMEMBER, dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change. 
    // ! We need to pass the "id", "title" and "price" data because we are expecting it (see cart-slice.js) at state.items.push({}) 
    // ! As you can see, this data comes from the PROPS! Check out Product.js to see how we pass this data to <ProductItem />
    dispatch(cartActions.addItemToCart({
      id,
      title,
      price
    })
    )
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
