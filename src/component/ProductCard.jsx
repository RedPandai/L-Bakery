import Link from "next/link";
import Image from "next/legacy/image";
import styles from "../styles/Product.module.css";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link className={styles.container} href={`/product/${product._id}`} passHref>
        <Image src={product.img} alt="product" width="300" height="200" />
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>£{product.prices[0]}</span>
        <p className={styles.desc}>{product.desc}</p>
      </Link>
    </>
  );
};

export default ProductCard;
