import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

import { useSelector } from "react-redux";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Test1",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    id: "p2",
    title: "Test2",
    price: 7,
    description: "This is a second product - osm!",
  },
  {
    id: "p3",
    title: "Test3",
    price: 8,
    description: "This is a third product - nice!",
  },
];

const Products = (props) => {
  const products = useSelector((state) => state.productItem.Items);

  const productItem = products.map((product) => {
    return (
      <ProductItem
        key={product.id}
        id={product.id}
        title={product.title}
        price={product.price}
        description={product.description}
      />
    );
  });

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productItem}</ul>
    </section>
  );
};

export default Products;
