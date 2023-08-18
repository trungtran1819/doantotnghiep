import { Button, Modal, Form, Upload, Input } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const UserForm = (props: any) => {
  const [form, setForm] = useState<any>({});

  const onSave = () => {

  };

  const onCancel = () => {

  };

  return <Modal
    title="Thêm mới sản phẩm"
    centered
    open={props.open}
    onOk={() => onSave()}
    onCancel={() => onCancel()}
    width={800}
  >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
      >
        <Form.Item label="Tên">
          <Input placeholder="Tên người dùng" />
        </Form.Item>
        <Form.Item label="Email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Vai trò">
          <Input placeholder="Số lượng" />
        </Form.Item>
      </Form>
  </Modal>
};

export default UserForm;