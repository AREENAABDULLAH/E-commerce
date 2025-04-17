import React, { useState } from 'react';
import {
  Card,
  Button,
  Col,
  Row,
  Modal,
  Form,
  Input,
  Upload,
  message,
  InputNumber,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import burgerImage from '../assets/img 11.jpg';
import pizzaImage from '../assets/img 12.jpg';
import friesImage from '../assets/img 13.jpg';
import sodaImage from '../assets/img 14.jpg';
import hotdogImage from '../assets/img 15.jpg';
import wingsImage from '../assets/img 16.jpg';
import saladImage from '../assets/img 17.jpg';
import icecreamImage from '../assets/img 18.jpg';
import nachosImage from '../assets/img 19.jpg';
import tacosImage from '../assets/img 20.jpg';
import sandwichImage from '../assets/img 21.jpg';
import kebabImage from '../assets/img 22.jpg';
import pastaImage from '../assets/img 23.jpg';
import smoothieImage from '../assets/img 24.jpg';
import donutImage from '../assets/img 25.jpg';
import wrapImage from '../assets/img 26.jpg';

const initialProducts = [
  { name: 'Burger', price: 5.99, image: burgerImage },
  { name: 'Pizza', price: 8.99, image: pizzaImage },
  { name: 'Fries', price: 2.99, image: friesImage },
  { name: 'Soda', price: 1.99, image: sodaImage },
  { name: 'Hot Dog', price: 3.49, image: hotdogImage },
  { name: 'Chicken Wings', price: 7.99, image: wingsImage },
  { name: 'Salad', price: 4.99, image: saladImage },
  { name: 'Ice Cream', price: 2.49, image: icecreamImage },
  { name: 'Nachos', price: 4.99, image: nachosImage },
  { name: 'Tacos', price: 3.99, image: tacosImage },
  { name: 'Sandwich', price: 5.49, image: sandwichImage },
  { name: 'Kebab', price: 6.49, image: kebabImage },
  { name: 'Pasta', price: 7.49, image: pastaImage },
  { name: 'Smoothie', price: 3.49, image: smoothieImage },
  { name: 'Donut', price: 1.99, image: donutImage },
  { name: 'Wrap', price: 4.49, image: wrapImage },
];

const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result);
};

const Admin = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState('');

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
    setPreviewImage(product.image);
    form.setFieldsValue({
      name: product.name,
      price: product.price,
    });
  };

  const handleDelete = (name) => {
    const deletedProduct = products.find((p) => p.name === name);
    setProducts(products.filter((product) => product.name !== name));
    message.success(`Product "${deletedProduct.name}" has been deleted.`);
  };

  const handleModalOk = (values) => {
    const updatedProduct = {
      name: values.name,
      price: values.price,
      image: previewImage || currentProduct.image,
    };

    setProducts(
      products.map((product) =>
        product.name === currentProduct.name ? updatedProduct : product
      )
    );

    message.success('✅ Edit done successfully!');

    setIsModalVisible(false);
    setCurrentProduct(null);
    form.resetFields();
    setPreviewImage('');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentProduct(null);
    form.resetFields();
    setPreviewImage('');
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return false;
    }
    getBase64(file, (base64) => setPreviewImage(base64));
    return false;
  };

  return (
    <div className="product-cards-container">
      <Row gutter={16}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.name}>
            <Card hoverable cover={<img alt={product.name} src={product.image} />}>
              <Card.Meta
                title={product.name}
                description={`Price: $${product.price.toFixed(2)}`}
              />
              <div
                className="card-buttons"
                style={{ marginTop: '10px', display: 'flex', gap: '10px' }}
              >
                <Button type="primary" onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                <Button danger onClick={() => handleDelete(product.name)}>
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Edit Product"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleModalOk}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
          </Form.Item>
          <Form.Item label="Change Image">
            <Upload beforeUpload={beforeUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{ marginTop: 10, width: '100%' }}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;
   
    


