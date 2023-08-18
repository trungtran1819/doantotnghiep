import { Button, Table, Image, Layout, Carousel, Typography, Divider } from 'antd';
import React, { useEffect, useState, createContext } from 'react';
import api from '../../services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import { useParams } from 'react-router-dom';
import placeholderImg from '../../images/placeholder.png'

interface LineItemProps {
  product: {
    name: string;
    images: string[];
    unitPrice: number;
  }
  quantity: number;
}

const LineItem = (props: LineItemProps) => {
  const { product, quantity } = props;

  return <div style={{ width: '100%', display: 'flex', paddingBottom: '8px', borderBottom: 'solid 1px #ccc'}}>
    <div style={{ flex: '2 0 0'}}>{product.name}</div>
    <div style={{ flex: '1 0 0', padding: '0 8px'}}>
      <Image src={product.images && product.images[0] || placeholderImg}></Image>
    </div>
    <div style={{ flex: '1 0 0', textAlign: 'right'}}>{product.unitPrice.toLocaleString('it-IT')}đ</div>
    <div style={{ flex: '1 0 0', textAlign: 'right'}}>{quantity}</div>
    <div style={{ flex: '1 0 0', textAlign: 'right'}}>{(product.unitPrice * quantity).toLocaleString('it-IT')}đ</div>
  </div>
};

const Cart = () => {
  const [cart, setCart] = useState<any>({ items: [] });

  const fetchCart = async () => {
    const cartData = await api.getCart();
    setCart(cartData);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const checkout = () => {
    window.location.replace('/checkout');
  };
  
  const total = cart.items.reduce((result: number, item: any) => result + item.quantity * item.product.unitPrice, 0);

  return <>
    <Layout>
      <Header></Header>
      <Layout.Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 'calc(100vh - 280px)'}}>
        <Typography.Title>Giỏ hàng</Typography.Title>
        <div style={{ display: 'flex', width: '800px', marginTop: '32px'}}>
          <div style={{ width: '540px', paddingRight: '32px' }}>
            <div style={{ width: '100%', display: 'flex'}}>
              <div style={{ flex: '2 0 0 '}}>
                <Typography.Paragraph strong>Sản phẩm</Typography.Paragraph>
              </div>
              <div style={{ flex: '1 0 0'}}>
                <Typography.Paragraph style={{ textAlign: 'center'}} strong>Hình ảnh</Typography.Paragraph>
              </div>
              <div style={{ flex: '1 0 0'}}>
                <Typography.Paragraph style={{ textAlign: 'right'}} strong>Giá</Typography.Paragraph>
              </div>
              <div style={{ flex: '1 0 0'}}>
                <Typography.Paragraph style={{ textAlign: 'right'}} strong>Số lượng</Typography.Paragraph>
              </div>
              <div style={{ flex: '1 0 0'}}>
                <Typography.Paragraph style={{ textAlign: 'right'}} strong>Tổng</Typography.Paragraph>
              </div>
            </div>
            {
              cart && cart.items.map((item: any) => <LineItem product={item.product} quantity={item.quantity}></LineItem>)
            }
          </div>
          <div style={{ width: '240px', paddingLeft: '32px', borderLeft: 'solid 1px #ccc'}}>
            <Typography.Title style={{ marginTop: '0'}} level={5}> Tổng đơn hàng</Typography.Title>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography.Paragraph strong>Đơn hàng</Typography.Paragraph>
              <Typography.Paragraph>{total.toLocaleString('it-IT')}đ</Typography.Paragraph>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography.Paragraph strong>Phí giao hàng</Typography.Paragraph>
              <Typography.Paragraph>Free</Typography.Paragraph>
            </div>
            <Divider></Divider>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography.Paragraph strong>Tổng</Typography.Paragraph>
              <Typography.Paragraph>{total.toLocaleString('it-IT')}đ</Typography.Paragraph>
            </div>
            <Button onClick={checkout} type='primary' style={{ width: '100%', background: '#b91c1c'}}>Tiến hành thanh toán</Button>
          </div>
        </div>
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  </>
};

export default Cart;