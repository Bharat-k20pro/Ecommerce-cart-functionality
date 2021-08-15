import classes from "./CartButton.module.css";

import { useDispatch, useSelector } from "react-redux";
import { cartShowActions } from "../../store/index";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const Items = useSelector((state) => state.cartItem.items);

  let numberOfItems = 0;

  Items.forEach((item) => (numberOfItems += item.quantity));

  const cartShowHandler = () => {
    dispatch(cartShowActions.showOrHideCart());
  };

  return (
    <button onClick={cartShowHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default CartButton;
