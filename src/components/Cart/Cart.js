import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import { useSelector } from "react-redux";

const Cart = (props) => {
  const Items = useSelector((state) => state.cartItem.items);

  const cartItems = Items.map((item) => {
    return (
      <CartItem
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        quantity={item.quantity}
        total={item.totalAmount}
      />
    );
  });

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{cartItems}</ul>
    </Card>
  );
};

export default Cart;
