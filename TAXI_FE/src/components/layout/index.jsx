import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Headers";
import NavbarComponent from "../Navbars";
import Footer from "../Footers";

function Layout() {
  return (
    <div>
      <NavbarComponent />
      <Header />

      <div
        className="main-content"
        style={{
          padding: 20,
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
