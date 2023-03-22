import { useState } from "react";
import axios from "axios";
import server from "util/server";
import Image from "next/legacy/image";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, products }) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${server}/api/products/` + id
      );
      setProductList(productList.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    if(currentStatus>=2) return;

    try {
      const res = await axios.put(`${server}/api/orders/` + id, {
        status: currentStatus + 1
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th className={styles.id}>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {productList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="contain"
                    alt="product"
                  />
                </td>
                <td className={styles.id}><p className={styles.span}>{product._id}</p></td>
                <td>{product.title}</td>
                <td>£{product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th className={styles.id}>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td className={styles.id}>
                  <p className={styles.span}>{order._id}</p>
                </td>
                <td>{order.customer}</td>
                <td>£{order.total}</td>
                <td>
                  {order.method === 0 ? <span>Cash</span> : <span>Paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className={styles.nextstage}
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
        //not cache
      },
    };
  }

  const productRes = await axios.get(`${server}/api/products/`);
  const orderRes = await axios.get(`${server}/api/orders/`);

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
