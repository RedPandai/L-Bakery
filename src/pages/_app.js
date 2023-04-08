import Layout from "@/component/Layout";
import store from "redux/store";
import Router from "next/router";
import { usePageLoading } from "@/component/usePageLoading";
import { Provider } from "react-redux";
import { Nunito } from "@next/font/google";
import { Loading } from "@/component/Loading";
import "@/styles/globals.css";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--Nunito-font",
});

export default function App({ Component, pageProps }) {
  const { isPageLoading } = usePageLoading();
  return (
    <>
      {isPageLoading ? (
        <Loading />
      ) : (
        <main className={nunito.className}>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </main>
      )}
    </>
  );
}
