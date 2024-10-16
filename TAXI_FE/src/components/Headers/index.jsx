import { Layout, Menu } from "antd";
import React from "react";
import { Container } from "reactstrap";



function Header() {
  const { Header } = Layout;

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div
        className="logo"
        style={{
          color: "#fff",
          float: "left",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        MyApp
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">Contact</Menu.Item>
      </Menu>
    </Header>
  );
}

export default Header;