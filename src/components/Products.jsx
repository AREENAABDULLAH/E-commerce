import React, { useState } from 'react';
import { Card, Button, Col, Row, Modal, Form, Input } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './ProductCards.css';

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
  { id: 1, name: 'Burger', price: 5.99, image: burgerImage },
  { id: 2, name: 'Pizza', price: 8.99, image: pizzaImage },
  { id: 3, name: 'Fries', price: 2.99, image: friesImage },
  { id: 4, name: 'Soda', price: 1.99, image: sodaImage },
  { id: 5, name: 'Hot Dog', price: 3.49, image: hotdogImage },
  { id: 6, name: 'Chicken Wings', price: 7.99, image: wingsImage },
  { id: 7, name: 'Salad', price: 4.99, image: saladImage },
  { id: 8, name: 'Ice Cream', price: 2.49, image: icecreamImage },
  { id: 9, name: 'Nachos', price: 4.99, image: nachosImage },
  { id: 10, name: 'Tacos', price: 3.99, image: tacosImage },
  { id: 11, name: 'Sandwich', price: 5.49, image: sandwichImage },
  { id: 12, name: 'Kebab', price: 6.49, image: kebabImage },
  { id: 13, name: 'Pasta', price: 7.49, image: pastaImage },
  { id: 14, name: 'Smoothie', price: 3.49, image: smoothieImage },
  { id: 15, name: 'Donut', price: 1.99, image: donutImage },
  { id: 16, name: 'Wrap', price: 4.49, image: wrapImage },
];

const ProductCards = () => {
  const [products] = useState(initialProducts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const orderData = {
        ...values,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,
      };

      const res = await fetch('https://ecommerce-backend-beta-pearl.vercel.app/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ Order placed for ${selectedProduct.name}!\nMessage: ${data.message}`);
        setIsModalVisible(false);
        form.resetFields();
      } else {
        alert(`❌ Failed: ${data.message}`);
      }
    } catch (error) {
      console.log('Validation or fetch error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="product-cards-container">
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card hoverable cover={<img alt={product.name} src={product.image} />}>
              <Card.Meta
                title={product.name}
                description={`Price: $${product.price.toFixed(2)}`}
              />
              <div className="card-buttons" style={{ marginTop: '10px' }}>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => handleAddToCart(product)}
                >
                  Order Now
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ✅ Proper Modal block */}
      <Modal
        title={`Order: ${selectedProduct?.name}`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Place Order"
      >
        <Form form={form} layout="vertical" name="orderForm">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Your name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="Your phone number" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter your address' }]}
          >
            <Input.TextArea rows={3} placeholder="Your delivery address" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Order Quantity"
            rules={[{ required: true, message: 'Please enter quantity' }]}
          >
            <Input type="number" min={1} placeholder="How many?" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductCards;
