import { useState } from "react";
import Head from "next/head";
import Featured from "@/component/Featured";
import ProductList from "@/component/ProductList";
import Add from "@/component/Add";
import AddButton from "@/component/AddButton";
import axios from "axios";
import server from "util/server";
import dbConnect from "util/mongo";

export default function Home({ productList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <>
      <Head>
        <title>The L's Bakery</title>
        <meta
          name="description"
          content="Best Restaurant in Mushroom Village"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <ProductList productList={productList} />
      {!close && <Add setClose={setClose} />}
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  await dbConnect();
  //await dbconnect can solve the 500 error
  const res = await axios.get(`${server}/api/products`);
  return {
    props: {
      productList: res.data,
      admin,
    },
  };
};
