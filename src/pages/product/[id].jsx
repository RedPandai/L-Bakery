import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "redux/cartSlice";
import { addAnimation,resetAdd } from "redux/addtoCart";
import server from "util/server";

import axios from "axios";
import Image from "next/legacy/image";
import styles from "../../styles/ProductItem.module.css";

const ProductItem = ({ product }) => {
  const [price, setPrice] = useState(product.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);

  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };
  const handleSize = (sizeIndex) => {
    const difference = product.prices[sizeIndex] - product.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleIncrement = () => {
    if (quantity < 5) setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  //add to cart animation

  const handleClick = () => {
    dispatch(addProduct({ ...product, extras, price, quantity }));
    //add to cart animation, 1.product.img, 2.cart logo shaking
    dispatch(addAnimation());
    setTimeout(()=>{
      dispatch(resetAdd())
    },500)   
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={product.img}
            objectFit="contain"
            layout="fill"
            alt="product"
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.name}</h1>
        <span className={styles.price}>£{price}</span>
        <p className={styles.desc}>Ingredient: {product.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <input
            className={styles.input}
            onClick={() => handleSize(0)}
            id="radio-1"
            name="size"
            value="small"
            type="radio"
          />
          <label className={styles.number} htmlFor="radio-1">
            Small
          </label>

          <input
            className={styles.input}
            onClick={() => handleSize(1)}
            id="radio-2"
            name="size"
            value="medium"
            type="radio"
          />
          <label className={styles.number} htmlFor="radio-2">
            Medium
          </label>

          <input
            className={styles.input}
            onClick={() => handleSize(2)}
            id="radio-3"
            name="size"
            value="large"
            type="radio"
          />
          <label className={styles.number} htmlFor="radio-3">
            Large
          </label>
        </div>

        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {product.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <button className={styles.smallbutton} onClick={handleDecrement}>
            -
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button className={styles.smallbutton} onClick={handleIncrement}>
            +
          </button>
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${server}/api/products/${params.id}`
  );
  return {
    props: {
      product: res.data,
    },
  };
};
