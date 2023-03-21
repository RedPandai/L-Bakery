import Layout from "@/component/Layout";

import store from "redux/store";
import { Provider } from "react-redux";

import { Nunito } from "@next/font/google";
import "@/styles/globals.css";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--Nunito-font",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={nunito.className}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </main>
  );
}
