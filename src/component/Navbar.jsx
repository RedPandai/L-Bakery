import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link className={styles.link} href="/">
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <li className={styles.listItem}>Product</li>
          <li className={styles.listItem}>Menu</li>
          <Link className={styles.link} href="/">
            <div className={styles.logo}>
              <Image
                src="/img/logo.png"
                alt="logo"
                height="100"
                width="100"
                style={{ objectFit: "cover" }}
              />
              <p className={styles.name}>The L's Bakery</p>
            </div>
          </Link>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <Link href='contact'><li className={styles.listItem}>Contact</li></Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
