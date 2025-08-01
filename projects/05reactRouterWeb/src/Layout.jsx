import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      {/* Things will be changed from here */}
      <Outlet />
      {/* Things will be changed till here */}
      <Footer />
    </>
  );
};

export default Layout;
