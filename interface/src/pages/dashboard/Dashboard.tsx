import { Button, Card, Divider, Table, Typography } from 'antd';
import React, { useEffect, useState, createContext } from 'react';
import api from '../../services/api';

const columns = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Lượt bán',
    dataIndex: 'sales',
    key: 'sales',
  },
  {
    title: 'Doanh thu',
    dataIndex: 'revenue',
    key: 'revenue',
  }
]

const Dashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    const result = await api.getTopSalesProducts();
    setProducts(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <>
    <div>
      <div style={{ width: '100%', display: 'flex', padding: '24px' }}>
        <Card style={{ marginRight: '48px', width: '360px'}}>
          <Typography.Paragraph>Tổng doanh thu</Typography.Paragraph>
          <Typography.Title level={3}>VND 1.006,000,000</Typography.Title>
          <Divider></Divider>
          <Typography.Paragraph>Trong tháng 200.900.000</Typography.Paragraph>
          <Typography.Paragraph>Trong ngày 2.500.000</Typography.Paragraph>
        </Card>
        <Card style={{ marginRight: '48px', width: '360px'}}>
          <Typography.Paragraph>Tổng lượt xem</Typography.Paragraph>
          <Typography.Title level={3}>10,000</Typography.Title>
          <Divider></Divider>
          <Typography.Paragraph>Trong tháng 1000</Typography.Paragraph>
          <Typography.Paragraph>Trong ngày 60</Typography.Paragraph>
        </Card>
        <Card style={{ width: '360px'}}>
          <Typography.Paragraph>Tỷ lệ chốt đơn</Typography.Paragraph>
          <Typography.Title level={3}>%60</Typography.Title>
          <Divider></Divider>
          <Typography.Paragraph>Giảm 5% so với tháng trước</Typography.Paragraph>
          <Typography.Paragraph>Tăng 10% so với hôm qua</Typography.Paragraph>
        </Card>
      </div>
      <div style={{ width: '100%', display: 'flex', padding: '24px' }}>
        <Card style={{ width: '100%' }} title="Sản phẩm bán chạy">
          <Table dataSource={products} columns={columns}>
          </Table>
        </Card>
      </div>
    </div>
  </>
};

export default Dashboard;