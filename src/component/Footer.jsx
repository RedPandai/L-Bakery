import React from "react";
import Image from "next/legacy/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image alt="background" src="/img/background.jpg" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            BAKING MEMORIES THAT LAST A LIFETIME.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Find Our Bakery</h1>
          <p className={styles.text}>
            Eagle Tree
            <br /> Fluffy Mountain, Stone Town
            <br /> 12A 34B
            <br /> 12345678910
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Opening Hours</h1>
          <p className={styles.text}>
            Monday to Friday
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            Saturday to Sunday
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
