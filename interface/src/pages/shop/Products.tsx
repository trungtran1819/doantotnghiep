import { Button, Table, Tag, Space, Modal, Image, Layout, Card, Typography, Row, Col } from 'antd';
import React, { useEffect, useState, createContext } from 'react';
import api from '../../services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import placeholderImg from '../../images/placeholder.png'
import { useParams } from 'react-router-dom';

const { Meta } = Card;

const ProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const fetchProducts = async () => {
    setLoading(true);
    const result = await api.getProducts();
    setProducts(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const redirectToProduct = (id: string) => {
    window.location.replace(`/products/${id}`);
  };

  return <>
    <Layout>
      <Header></Header>
      <Layout.Content style={{ padding: '32px' }}>
        <Typography.Title>
          Danh sách sản phẩm
        </Typography.Title>
        <Row gutter={[16, 16]}>
          {
            products.map((product) => <Col span={4}>
              <Card
                cover={<Image placeholder={placeholderImg} alt="example" src={product && product.images && product.images[0] || placeholderImg} />}
              >
                <Meta title={product.name} description={product.description} />

                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '32px' }}>
                  <Button type='primary' size='large' style={{ background: '#b91c1c' }} onClick={() => redirectToProduct(product.id)}>Xem chi tiết</Button>
                </div>
              </Card>
            </Col>)
          }
        </Row>
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  </>
};

export default ProductsPage;