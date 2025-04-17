import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importing the custom CSS file
import logo from '../assets/download.png'; // Adjust the path as necessary

const { Header } = Layout;

const Navbar = () => {
  return (
    <Layout>
      <Header className="navbar">
        <div className="logo" style={{ float: 'left' }}>
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <Menu theme="white" mode="horizontal" className="navbar-menu">
          <Menu.Item key="1">
            <Link to="/" className="menu-item">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/products" className="menu-item">Items</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/admin" className="menu-item">Admin</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/signup">
              <Button className="auth-button">Sign Up</Button>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/login">
              <Button className="auth-button">Login</Button>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}

export default Navbar;
