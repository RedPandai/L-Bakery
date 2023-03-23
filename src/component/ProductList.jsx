import React from "react";
import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = ({productList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST BAKERY IN TOWN</h1>
      <p className={styles.desc}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem, molestias
        dignissimos nobis alias sint saepe laboriosam itaque! Laboriosam harum
        excepturi tempora. Officia accusamus velit, animi provident saepe sint
        nam tempore dolorem quod sit sunt dolorum necessitatibus iste voluptatem
        dicta deserunt ducimus doloribus eius unde nostrum maxime nihil libero.
        Quo, maiores.
      </p>
      <div className={styles.wrapper}>
        {productList && productList.map(product=>(
          <ProductCard key={product._id} product={product}/>
        ))} 
      </div>
    </div>
  );
};

export default ProductList;
