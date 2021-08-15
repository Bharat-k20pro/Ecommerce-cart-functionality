import classes from "./CartItem.module.css";

import { useDispatch } from "react-redux";
import { cartItemActions } from "../../store/index";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const itemIncrementHandler = () => {
    dispatch(
      cartItemActions.addItem({
        id: props.id,
      })
    );
  };

  const itemDecrementHandler = () => {
    dispatch(cartItemActions.removeItem(props.id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{props.title}</h3>
        <div className={classes.price}>
          ${props.total.toFixed(2)}{" "}
          <span className={classes.itemprice}>
            (${props.price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{props.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={itemDecrementHandler}>-</button>
          <button onClick={itemIncrementHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
