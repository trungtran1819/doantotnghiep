import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import api from '../../services/api';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = async () => {
    console.log('login');
    setLoading(true);

    try {
      await api.login(username, password);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return <>
    <div style={{ display: 'flex', width: '100vw', justifyContent: 'center', height: '100vh' }}>
      <div style={{ width: '480px', display: 'flex', flexDirection: 'column', padding: '48px' }}>
        <Typography.Title level={4}>Hamako</Typography.Title>
        <Typography.Title level={5} type='secondary'>Tinh hoa ẩm thực thượng hạng</Typography.Title>
        <Form
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onLogin}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên người dùng!',
              },
            ]}
          >
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Tên người dùng"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Quên mật khẩu
            </a>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} disabled={!username || !password} onClick={onLogin} type="primary" className="login-form-button">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </>
};

export default SignIn;