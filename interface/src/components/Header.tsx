import { Avatar, Layout, Typography, Image, theme } from "antd";
import logoImage from '../images/logo.jpg';

const Header = () => {
  const {
    token: { colorBgContainer, boxShadow },
  } = theme.useToken();

  return <Layout.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: colorBgContainer, boxShadow }}>
    <Typography.Title level={5}>Hamako</Typography.Title>
    <Avatar>T</Avatar>
  </Layout.Header>
};

export default Header;