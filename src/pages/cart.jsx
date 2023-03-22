import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { reset } from "redux/cartSlice";
import server from "util/server";
import axios from "axios";
import Image from "next/legacy/image";
import styles from "../styles/Cart.module.css";
import OrderDetail from "@/component/OrderDetail";

const cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "GBP";
  const style = { layout: "vertical" };
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`${server}/api/orders`, data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td className={styles.td}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="contain"
                      alt="product"
                    />
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
            {cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>£0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>£{cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton} onClick={()=>setCash(true)}>CASH ON DELIVERY</button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ARQCGnBMU61wZOYKpdwd1WE94BGfxM6Jc80wpNbk6a9Wp_YwFo4WM3q36bMiauQpKS4O2QXC4F0mgKoO",
                  components: "buttons",
                  currency: "GBP",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className={styles.button}
              disabled={!amount}
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder}/>}
    </div>
  );
};

export default cart;
