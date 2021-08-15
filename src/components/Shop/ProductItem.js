import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

import { useDispatch } from "react-redux";
import { cartItemActions } from "../../store/index";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(
      cartItemActions.addItem({
        id: props.id,
        title: props.title,
        price: props.price,
        quantity: 1,
        totalAmount: props.price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{props.title}</h3>
          <div className={classes.price}>${props.price.toFixed(2)}</div>
        </header>
        <p>{props.description}</p>
        <div className={classes.actions}>
          <button onClick={addItemHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
