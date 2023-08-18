import { Avatar, Layout, Typography, theme } from "antd";

const Footer = () => {
  const {
    token: { boxShadow },
  } = theme.useToken();

  return <Layout.Footer style={{ height: '240px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#b91c1c', color: '#fff', boxShadow }}>
    <div>
      <Typography.Title style={{  color: "#fff" }} level={3}>Hamako</Typography.Title>
      <Typography.Title style={{  color: "#fff" }} level={5}>Tinh hoa ẩm thực thượng hạng</Typography.Title>
    </div>

    <div>
      <Typography.Paragraph style={{  color: "#fff" }} strong>Địa chỉ</Typography.Paragraph>
      <Typography.Paragraph style={{  color: "#fff" }}>Cơ sở 1: 76 Bùi Thị Xuân - Hai Bà Trưng - Hà Nội</Typography.Paragraph>
      <Typography.Paragraph style={{  color: "#fff" }}>Cơ sở 2: Vinaconex 3 Trung Văn, Từ Liêm , Hà Nội</Typography.Paragraph>
    </div>
  </Layout.Footer>
};

export default Footer;