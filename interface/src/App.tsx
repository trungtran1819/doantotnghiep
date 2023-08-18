import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Layout, theme } from 'antd';
import Header from './components/Header';
import Navbar from './components/Navbar';

import Products from './pages/products/Products';
import Users from './pages/users/Users';
import Orders from './pages/orders/Orders';
import SignIn from './pages/users/SignIn';
import Dashboard from './pages/dashboard/Dashboard';
import Categories from './pages/category/Categories';

import HomePage from './pages/shop/Home';
import ProductsPage from './pages/shop/Products';
import ProductDetail from './pages/shop/Product';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';


const router = createBrowserRouter(
  [
    {
      path: "admin",
      children: [
        {
          path: "",
          element: <Dashboard/>,
        },
        {
          path: "dashboard",
          element: <Dashboard/>,
        },
        {
          path: "signin",
          element: <SignIn/>,
        },
        {
          path: "orders",
          element: <Orders/>,
        },
        {
          path: "products",
          element: <Products/>,
        },
        {
          path: "categories",
          element: <Categories/>,
        },
        {
          path: "users",
          element: <Users/>,
        }
      ]
    },
    {
      path: '',
      element: <HomePage></HomePage>
    },
    {
      path: 'home',
      element: <HomePage></HomePage>
    },
    {
      path: 'products',
      element: <ProductsPage></ProductsPage>
    },
    {
      path: '/products/:productId',
      element: <ProductDetail></ProductDetail>,
    },
    {
      path: 'cart',
      element: <Cart></Cart>
    },
    {
      path: 'checkout',
      element: <Checkout></Checkout>
    }
  ]
);

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (window.location.pathname.startsWith('/admin')) {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return (
        <SignIn></SignIn>
      )
    }
  
    return (
      <Layout>
        <Header></Header>
        <Layout>
          <Navbar></Navbar>
          <Layout>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <RouterProvider router={router}></RouterProvider>
            </Content>
            <Footer style={{ textAlign: 'center' }}> Đồ án tốt nghiệp - Trần Quốc Trung</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  return <RouterProvider router={router}></RouterProvider>
};

export default App;