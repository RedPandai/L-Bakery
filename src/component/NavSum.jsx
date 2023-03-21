import Image from "next/legacy/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "../styles/NavbarSum.module.css";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";

const NavSum = () => {
  const quantity = useSelector((state) =>state.cart.totalQuan);
  const animation = useSelector((state)=>state.addtoCart.added)

  return (
    <div className={styles.container}>
      <Link className={styles.link} href="/">
        <div className={styles.logo}>
          <Image
            src="/img/logo.png"
            alt="logo"
            height="100"
            width="100"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image
            src="/img/telephone.svg"
            alt="telephone"
            width="33"
            height="33"
          />
        </div>
        <div className={styles.text}>
          <p className={styles.text}>ORDER NOW!</p>
          <p className={styles.text}>12345678910</p>
        </div>
      </div>
      <MobileNav />
      <Navbar />

      <div className={styles.item}>
        <Link href="/cart" passHref>
          <div className={styles.cart}>
            <div className={styles.counter}>{+quantity}</div>
            <Image
              src="/img/cart.svg"
              alt="logo"
              height="30"
              width='30'
              objectFit= "cover"
              className={animation ? styles.animation : styles.static}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavSum;
