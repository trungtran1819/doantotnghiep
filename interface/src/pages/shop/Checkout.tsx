import { Form, Input, Layout, Typography, Button, Divider, Result } from 'antd';
import React, { useEffect, useState, createContext } from 'react';
import api from '../../services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import { useParams } from 'react-router-dom';

const CheckoutPage = () => {
  const [cart, setCart] = useState<any>({ items: [] });
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);

  const onSave = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      await api.createOrder({
        items: cart.items,
        customer: values,
      });
      api.clearCart();
      setSuccess(true);
    } catch (err) {
      console.log(err);
    };
  };

  const fetchCart = async () => {
    const cartData = await api.getCart();
    setCart(cartData);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.items.reduce((result: number, item: any) => result + item.quantity * item.product.unitPrice, 0);

  const continueShopping = () => {
    window.location.replace('/products');
  };

  if (success) {
    return <>
      <Layout>
        <Header></Header>
        <Layout.Content style={{ minHeight: 'calc(100vh - 280px)', padding: '32px'}}>
          <div style={{ display: 'flex', width: '800px', margin: 'auto' }}>
            <Result
              status="success"
              title="Đặt hàng thành công!"
              subTitle="Đơn hàng của quý khách đang được chuẩn bị và giao tới cho quý khách hàng trong một vài ngày tới."
              extra={[
                <Button onClick={continueShopping} style={{ background: '#b91c1c' }} type="primary" key="console">
                  Tiếp tục mua sắm
                </Button>,
              ]}
            />
          </div>
        </Layout.Content>
        <Footer></Footer>
      </Layout>
    </>
  }

  return <>
    <Layout>
      <Header></Header>
      <Layout.Content style={{ minHeight: 'calc(100vh - 280px)', padding: '32px'}}>
        <div style={{ display: 'flex', width: '800px', margin: 'auto' }}>
          <div style={{ width: '480px' }}>
            <Typography.Title level={4}>Thông tin đặt hàng</Typography.Title>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="vertical"
              form={form}
              style={{ width: '100%' }} 
            >
              <Form.Item  style={{ width: '100%' }}  label="Họ tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
                <Input style={{ width: '400px' }} placeholder="Họ tên" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input style={{ width: '400px' }} placeholder="email" />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                <Input style={{ width: '400px' }} placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}>
                <Input.TextArea style={{ minWidth: '400px' }} placeholder="Địa chỉ"></Input.TextArea>
              </Form.Item>
            </Form>
          </div>
          <div style={{ width: '320px', border: 'solid 2px #b91c1c', padding: '0 16px'}}>
            <Typography.Title level={4}>Đơn hàng của bạn</Typography.Title>
            <Divider></Divider>
            {
              cart && cart.items.map((item: any) => <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Typography.Paragraph strong>{item.product.name}</Typography.Paragraph>
                <Typography.Paragraph>x{item.quantity}</Typography.Paragraph>
                <Typography.Paragraph>{(item.product.unitPrice * item.quantity).toLocaleString('it-IT')}đ</Typography.Paragraph>
              </div>)
            }
            <Divider></Divider>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography.Paragraph strong>Tổng</Typography.Paragraph>
              <Typography.Paragraph>{total.toLocaleString('it-IT')}đ</Typography.Paragraph>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography.Paragraph strong>Phí vận chuyển</Typography.Paragraph>
              <Typography.Paragraph>Miễn phí</Typography.Paragraph>
            </div>
            <Typography.Paragraph strong>Thanh toán khi nhận hàng</Typography.Paragraph>
            <Button onClick={onSave} type='primary' size='large' style={{ width: '100%', background: '#b91c1c'}}>Đặt Hàng</Button>
          </div>
        </div>
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  </>
};

export default CheckoutPage;