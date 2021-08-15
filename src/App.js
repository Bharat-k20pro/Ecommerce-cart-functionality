import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useSelector, useDispatch } from "react-redux";
import { cartShowActions } from "./store/index";
import { sendCartData, fetchCartData, fetchProductData } from "./store/index";

let isInitial = true;

function App() {
  const cartShow = useSelector((state) => state.cartShow.showCart);
  const cartItem = useSelector((state) => state.cartItem);
  const notification = useSelector((state) => state.cartShow.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cartItem.changed) dispatch(sendCartData(cartItem));
  }, [cartItem, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartShow && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
