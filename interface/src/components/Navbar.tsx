import React, { useEffect } from 'react';
import { Layout, Menu, theme } from "antd";
import { UserOutlined, BarChartOutlined, ShopOutlined, DollarCircleOutlined, OrderedListOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: 'admin/dashboard' ,
    icon: React.createElement(BarChartOutlined),
    label: 'Thống kê',
  },
  {
    key: 'admin/orders',
    icon: React.createElement(DollarCircleOutlined),
    label: 'Đơn hàng',
  },
  {
    key: 'admin/products',
    icon: React.createElement(ShopOutlined),
    label: 'Sản phẩm',
  },
  {
    key: 'admin/categories',
    icon: React.createElement(OrderedListOutlined),
    label: 'Danh mục',
  },
  // {
  //   key: 'admin/users',
  //   icon: React.createElement(UserOutlined),
  //   label: 'Người dùng',
  // },
]

const Navbar = () => {
  const {
    token: { colorBgContainer, boxShadowSecondary },
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

  return (
    <Sider width={240} style={{ background: colorBgContainer,  paddingTop: '48px' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['users']}
        defaultOpenKeys={['dashboard']}
        selectedKeys={[selected]}
        style={{ height: '100%', borderRight: 0 }}
        items={items}
        onSelect={onSelect}
      />
    </Sider>
  )
}

export default Navbar;