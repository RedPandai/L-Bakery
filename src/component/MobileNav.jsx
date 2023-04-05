import React, { useState } from "react";
import Link from "next/link";
import { CgMenu, CgClose } from "react-icons/cg";
import styles from "../styles/MobileNav.module.css";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const closeMobileMenu = () => setOpen(false);

  const hamburgerIcon = (
    <CgMenu className={styles.hamburger} size="40px" onClick={toggleOpen} />
  );
  const closeIcon = (
    <CgClose className={styles.hamburger} size="40px" onClick={toggleOpen} />
  );

  return (
    <div className={styles.mobileNav}>
      {open ? closeIcon : hamburgerIcon}
      {open && (
        <ul className={styles.ul}>
          <Link className={styles.link} href="/">
            <li className={styles.li} onClick={closeMobileMenu}>
              <span className={styles.text}>Home</span>
            </li>
          </Link>

          <li className={styles.li} onClick={closeMobileMenu}>
            <span className={styles.text}>Booking</span>
          </li>

          <li className={styles.li} onClick={closeMobileMenu}>
            <span className={styles.text}>Menu</span>
          </li>

          <Link className={styles.link} href="/contact">
            <li className={styles.li} onClick={closeMobileMenu}>
              <span className={styles.text}>Contact</span>
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default MobileNav;
