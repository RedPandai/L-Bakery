import axios from "axios";
import server from "util/server";
import Image from "next/legacy/image";
import styles from "../../styles/Order.module.css";

const Order = ({order}) => {
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th className={styles.th}>Order ID</th>
                <th className={styles.th}>Customer</th>
                <th className={styles.th}>Address</th>
                <th className={styles.th}>Total</th>
              </tr>
              <tr className={styles.tr}>
                <td className={styles.td}>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.name}>{order.customer}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.address}>{order.address}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.total}>£{order.total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>£{order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>£0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>£{order.total}
          </div>
          <button disabled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};


export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`${server}/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};

export default Order;