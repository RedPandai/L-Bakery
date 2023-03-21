import React from "react";
import Footer from "./Footer";
import NavSum from "./NavSum";

const Layout = ({children}) => {
  return (
    <>
      <NavSum />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
