import { useState } from "react";
import deliveryForm from "@/utili/deliveryForm";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder, handleModal }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { errors, isValid } = deliveryForm({ customer, phone, address });

  const handleClick = (e) => {
    // e.preventDefault();
    isValid && createOrder({ customer, address, total, method: 0 });
    //cash method is 0, paypal is 1
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.close} onClick={handleModal}>
          X
        </button>
        <h1 className={styles.title}>You will pay £6 for delivery</h1>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            placeholder="Your Name Here"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
          <div className={styles.error}> {customer && errors.customer}</div>
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Your Phone Number Here"
            className={styles.input}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className={styles.error}> {phone && errors.phone}</div>
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            rows={5}
            placeholder="Your Address Here"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <div className={styles.error}> {address && errors.address}</div>
        </div>
        <button
          className={styles.button}
          onClick={handleClick}
          disabled={!isValid}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
