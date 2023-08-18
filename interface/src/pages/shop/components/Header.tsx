import { Avatar, Layout, Typography, Image, Menu, Input, theme, Button } from "antd";
import React, { useEffect } from "react";
import { SearchOutlined } from '@ant-design/icons';
import logoImage from '../../../images/logo.jpg';


import type { MenuProps } from 'antd';

const { Sider } = Layout;
const { Search } = Input;

const items: MenuProps['items'] = [
  {
    key: 'products' ,
    label: 'Menu',
  },
  {
    key: 'products?category=san-pham-so-che',
    label: 'Sản phẩm sơ chế',
  },
  {
    key: 'products?category=unagi',
    label: 'Unagi',
  },
  {
    key: 'products?category=sashimi',
    label: 'Sashimi',
  },
  {
    key: 'products?category=sake',
    label: 'Sake',
  }
];

const Header = () => {
  const {
    token: { colorBgContainer, boxShadow },
  } = theme.useToken();

  const [selected, setSelected] = React.useState('dashboard');

  useEffect(() => {
    if (window.location.pathname) {
      setSelected(window.location.pathname.substring(1));
    }
  }, []);

  const onSelect = (value: any) => {
    if (selected !== `/${value.key}`) {
      window.location.replace(`/${value.key}`);
    }
  };

  return <Layout.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: colorBgContainer, boxShadow }}>
    <a href="/"><Image style={{ height: '60px' }} preview={false} src={logoImage}></Image></a>

    <Search style={{ width: '240px' }} enterButton={
      <Button icon={<SearchOutlined></SearchOutlined>} style={{ background: '#b91c1c' }} type="primary" size="small"></Button>
    } placeholder="Nhập từ khoá tìm kiếm"></Search>

    <Menu
      mode="horizontal"
      defaultSelectedKeys={[]}
      selectedKeys={[selected]}
      items={items}
      onSelect={onSelect}
    />
  </Layout.Header>
};

export default Header;