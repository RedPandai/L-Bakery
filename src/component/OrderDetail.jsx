import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    createOrder({ customer, address, total, method: 0 });
    //cash method is 0, paypal is 1
  };

  return (
    <div className={styles.container}>
      <form className={styles.wrapper}>
        <h1 className={styles.title}>You will pay £6 for delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name</label>
          <input
            placeholder="Your Name Here"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="Your Phone Number Here"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Your Address Here"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} onClick={handleClick} type='submit'>
          Order
        </button>
      </form>
    </div>
  );
};

export default OrderDetail;