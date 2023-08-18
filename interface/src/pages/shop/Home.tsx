import { Layout, Carousel, Image, Typography, Row, Col, Card, Button } from 'antd';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import bannerImage from '../../images/banner.jpg';
import bannerImage2 from '../../images/banner-02.jpg';
import api from '../../services/api';
import placeholderImg from '../../images/placeholder.png';

const { Meta } = Card;

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await api.getProducts();
      setProducts(result.splice(0, 6));
    } catch (err) {
      console.log(err);
    }
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
      <Layout.Content>
        <Carousel adaptiveHeight autoplay>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center'}}>
            <Image style={{ height: 'calc(100vh-280px)' }} src={bannerImage} preview={false}></Image>
          </div>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center'}}>
            <Image src={bannerImage2} preview={false}></Image>
          </div>
        </Carousel>
        
        <div style={{ 'background': '#b91c1c', padding: '16px 32px', marginTop: '64px', color: 'white', width: '480px'}}>
          <Typography.Title level={4} style={{ color: 'white'}}>Sản phẩm của chúng tôi</Typography.Title>
        </div>
        
        <div style={{ padding: '16px', marginTop: '64px' }}>
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
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '64px' }}>
          <Button type='primary' size='large' style={{ background: '#b91c1c' }} onClick={() => window.location.replace('/products') }>Xem tất cả sản phẩm</Button>
        </div>
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  </>
};

export default HomePage;