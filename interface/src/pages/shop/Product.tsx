import { Button, Table, Tag, Space, Modal, Layout, Carousel, Typography, Input, Divider } from 'antd';
import React, { useEffect, useState, createContext } from 'react';
import api from '../../services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import { useParams } from 'react-router-dom';
import { PlusOutlined, MinusOutlined} from '@ant-design/icons';
import placeholderImg from '../../images/placeholder.png'

const ProductDetail = (props: any) => {
  console.log(props);
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();

  
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const result = await api.getProduct(productId);
      setProduct(result);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const addToCart = () => {
    api.addToCart({
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        unitPrice: product.unitPrice,
        images: product.images,
      },
      quantity,
    });

    window.location.replace('/cart');
  };

  return <>
    <Layout>
      <Header></Header>
      <Layout.Content>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '64px', minHeight: 'calc(100vh - 280px)' }}>
          <div>
            <Carousel style={{ width: '320px' }} autoplay>
              {
                product && product.images && product.images.map((image: any) => {
                  return <div>
                    <img style={{ width: '320px'}} alt="example" src={image} />
                  </div>
                })
              }
              {
                !product || !product.images || product.images.length === 0 && <>
                  <div>
                    <img style={{ width: '320px'}} alt="example" src={placeholderImg} />
                  </div>
                  <div>
                    <img style={{ width: '320px'}} alt="example" src={placeholderImg} />
                  </div>
                </>
              }

            </Carousel>
          </div>
          <div style={{ minWidth: '360px', marginLeft: '64px' }}>
            <Typography.Title style={{ cursor: 'pointer', textDecoration: 'underline' }} type='secondary' level={5}>
              Trang chủ
            </Typography.Title>
            <Divider></Divider>
            <Typography.Title level={3}>
              {product.name}
            </Typography.Title>
            <div style={{ display: 'flex', paddingBottom: '24px' }}>
              <Typography.Title style={{ color: '#b91c1c'}} level={3}>
                {product && product.unitPrice && product.unitPrice.toLocaleString('it-IT') }
              </Typography.Title>
              <Typography.Title level={5} style={{ color: '#b91c1c' }}>
                đ
              </Typography.Title>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <Input
                style={{ width: '136px', textAlign: 'center' }}
                value={quantity}
                addonBefore={<MinusOutlined style={{ cursor: 'pointer' }} onClick={() => { quantity > 1 && setQuantity(quantity - 1)}}></MinusOutlined>}
                addonAfter={<PlusOutlined style={{ cursor: 'pointer' }} onClick={() => { setQuantity(quantity + 1)}}></PlusOutlined>}
                onChange={(e: any) => { setQuantity(e.target.value) }}
              ></Input>
              <Button onClick={addToCart} type='primary' size='large' style={{ background: '#b91c1c' }}>Đặt hàng</Button>
            </div>
            <Divider></Divider>
            <Typography.Paragraph>{product.description}</Typography.Paragraph>
          </div>
        </div>
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  </>
};

export default ProductDetail;