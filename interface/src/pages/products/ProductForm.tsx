import { Modal, Form, Upload, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import api from '../../services/api';

const ProductForm = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.editingProduct) {
      form.setFieldsValue(props.editingProduct);
    }
  }, [props.editingProduct]);

  const onSave = async () => {
    setLoading(true);

    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      try {
        if (!props.editingProduct) {
          await api.createProduct(values);
        } else {
          delete values.id;
          await api.updateProduct(props.editingProduct.id, values);
        }
      } catch (err) {
        window.alert('Lỗi ghi dữ liệu');
      }

      props.onClose && props.onClose();
      props.onComplete && props.onComplete();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const onCancel = () => {
    if (props.onClose) {
      props.onClose();
      form.resetFields();
    }
  };

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;
    try {
      const response = await api.uploadImage(file);
      onSuccess?.(response);
    } catch (err: any) {
      onError?.(err);
    }
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'done') {
      form.setFieldValue('images', info.fileList.map((file: any) => file?.response?.data?.data?.url));
    }
  };

  return <Modal
    title="Thêm mới sản phẩm"
    centered
    open={props.open}
    onOk={() => onSave()}
    onCancel={() => onCancel()}
    okButtonProps={{ loading }}
    width={800}
  >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        form={form}
      >
        <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
          <Input placeholder="Tên sản phẩm" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input placeholder="Mô tả sản phẩm" />
        </Form.Item>
        <Form.Item label="Ảnh sản phẩm" valuePropName="images" name="images">
          <Upload customRequest={uploadImage} onChange={handleChange} listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Số lượng" name="stock" rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}>
          <Input type='number' placeholder="Số lượng" />
        </Form.Item>
        <Form.Item label="Giá sản phẩm" name="unitPrice" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}>
          <Input type='number' placeholder="Giá sản phẩm" />
        </Form.Item>
      </Form>
  </Modal>
};

export default ProductForm;