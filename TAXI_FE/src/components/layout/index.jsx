
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import { Footer } from "antd/es/layout/layout";

function Layout() {
  return (
    <div>
      <Header />

      <div className="main-content" 
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
