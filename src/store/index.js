import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

const cartShowInitialState = {
  showCart: false,
  notification: null,
};

const cartShowSlice = createSlice({
  name: "cartShow",
  initialState: cartShowInitialState,
  reducers: {
    showOrHideCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const cartItemInitialState = {
  items: [],
  changed: false,
};

const cartItemSlice = createSlice({
  name: "cartItem",
  initialState: cartItemInitialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload;
    },
    addItem(state, action) {
      // state.items = state.items.concat(action.payload);
      const existingItem = state.items.find((item) => {
        return action.payload.id === item.id;
      });
      if (!existingItem) {
        state.items.push(action.payload);
      } else {
        existingItem.quantity++;
        existingItem.totalAmount += existingItem.price;
      }
      state.changed = true;
    },
    removeItem(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        item.quantity--;
        item.totalAmount -= item.price;
      }
      state.changed = true;
    },
  },
});

const initialProductitemState = {
  Items: [],
};

const productItemSlice = createSlice({
  name: "productItem",
  initialState: initialProductitemState,
  reducers: {
    replaceProduct(state, action) {
      state.Items = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    cartShow: cartShowSlice.reducer,
    cartItem: cartItemSlice.reducer,
    productItem: productItemSlice.reducer,
  },
});

export const sendCartData = (cartItem) => {
  return async (dispatch) => {
    try {
      dispatch(
        cartShowActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      const res = await axios.put(
        `${process.env.REACT_APP_FIREBASE_URL}/cart.json`,
        JSON.stringify(cartItem)
      );
      dispatch(
        cartShowActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully!",
        })
      );
      setTimeout(function () {
        dispatch(
          cartShowActions.showNotification({
            status: "",
            title: "",
            message: "",
          })
        );
      }, 1000);
    } catch (error) {
      dispatch(
        cartShowActions.showNotification({
          status: "error",
          title: "Error",
          message: "Eror sending cart data!",
        })
      );
      setTimeout(function () {
        dispatch(
          cartShowActions.showNotification({
            status: "",
            title: "",
            message: "",
          })
        );
      }, 1000);
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_FIREBASE_URL}/cart.json`
      );
      const data = res.data.items;
      dispatch(cartItemActions.replaceCart(data));
    } catch (error) {
      dispatch(
        cartShowActions.showNotification({
          status: "error",
          title: "Error",
          message: "Error fetching cart data!",
        })
      );
      setTimeout(function () {
        dispatch(
          cartShowActions.showNotification({
            status: "",
            title: "",
            message: "",
          })
        );
      }, 1000);
    }
  };
};

export const fetchProductData = () => {
  return async (dispatch) => {
    dispatch(
      cartShowActions.showNotification({
        status: "pending",
        title: "Fetching...",
        message: "Fetching cart data...",
      })
    );
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_FIREBASE_URL}/product.json`
      );
      const data = res.data;
      const products = [];
      for (const key in data) {
        products.push({
          id: key,
          title: data[key].title,
          price: data[key].price,
          description: data[key].description,
        });
      }
      dispatch(productionItemActions.replaceProduct(products));
      dispatch(
        cartShowActions.showNotification({
          status: "success",
          title: "Success",
          message: "fetched product data successfully!",
        })
      );
      setTimeout(function () {
        dispatch(
          cartShowActions.showNotification({
            status: "",
            title: "",
            message: "",
          })
        );
      }, 1000);
    } catch (error) {
      console.log(error);
      dispatch(
        cartShowActions.showNotification({
          status: "error",
          title: "Error",
          message: "Error fetching product data!",
        })
      );
      setTimeout(function () {
        dispatch(
          cartShowActions.showNotification({
            status: "",
            title: "",
            message: "",
          })
        );
      }, 1000);
    }
  };
};

export const cartShowActions = cartShowSlice.actions;
export const cartItemActions = cartItemSlice.actions;
export const productionItemActions = productItemSlice.actions;

export default store;
