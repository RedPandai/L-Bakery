import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "redux/cartSlice";
import { deleteProduct } from "redux/cartSlice";
import Link from "next/link";
import server from "util/server";
import axios from "axios";
import Image from "next/legacy/image";
import styles from "../styles/Cart.module.css";
import OrderDetail from "@/component/OrderDetail";
import PaypalCheckoutButton from "@/component/PaypalCheckoutButton";

const cart = () => {
  // console.log(process.env.NODE_ENV)
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const router = useRouter();

  // console.log(cart.total);
  //handle close button on the cash on delivery modal
  const handleModal = () => {
    setCash(!cash);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDelete = (product) => {
    dispatch(deleteProduct(product));
  };
  // hide the scroll bar when the modal open
  useEffect(() => {
    if (cash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [cash]);

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`${server}/api/orders`, data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            <tr className={styles.trTitle}>
              <th></th>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {cart.products.map((product, index) => (
              <tr className={styles.tr} key={index}>
                <td>
                  <button
                    className={styles.editbutton}
                    onClick={() => handleDelete(product)}
                  >
                    Delete
                  </button>
                </td>
                <td className={styles.td}>
                  <div className={styles.imgContainer}>
                    <Link href={`/product/${product._id}`}>
                      <Image
                        src={product.img}
                        layout="fill"
                        objectFit="contain"
                        alt="product"
                      />
                    </Link>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text},</span>
                    ))}
                  </span>
                </td>
                <td className={styles.td}>
                  <span className={styles.size}>{product.sizeName}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.price}>£{product.price}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.total}>
                    £{product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART SUMMARY</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>
            {cart.quantity}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>£0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>£{cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <PaypalCheckoutButton amount={amount} />
            </div>
          ) : (
            <button
              onClick={handleOpen}
              className={styles.button}
              disabled={!amount}
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && (
        <OrderDetail
          total={cart.total}
          handleModal={handleModal}
          createOrder={createOrder}
        />
      )}
    </div>
  );
};

export default cart;
