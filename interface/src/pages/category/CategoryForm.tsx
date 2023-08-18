import { Modal, Form, Upload, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import api from '../../services/api';

const CategoryForm = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { selecting } = props;

  console.log(props);

  useEffect(() => {
    if (selecting) {
      form.setFieldsValue(selecting);
    }
  }, [selecting]);

  const onSave = async () => {
    setLoading(true);

    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      await api.createCategory(values);

      if (props.onClose) {
        props.onClose();
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const onCancel = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return <Modal
    title="Thêm mới sản phẩm"
    centered
    open={props.open}
    onOk={() => onSave()}
    onCancel={() => onCancel()}
    okButtonProps={{ loading }}
    width={600}
  >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        form={form}
      >
        <Form.Item label="Tên danh mục" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}>
          <Input placeholder="Tên sản phẩm" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input placeholder="Mô tả danh mục" />
        </Form.Item>
        <Form.Item label="Ảnh danh mục" valuePropName="fileList" name="image">
          <Upload multiple={false} action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
  </Modal>
};

export default CategoryForm;