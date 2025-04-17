import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await fetch('https://ecommerce-backend-beta-pearl.vercel.app/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if (res.ok) {
                alert('Signup successful!');
                navigate('/login'); // Redirect to login page
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Something went wrong');
        }
    };

    return (
        <div style={{ padding: '50px' }}>
            <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
            <Form
                name="sign_up"
                onFinish={onFinish}
                layout="vertical"
                style={{ maxWidth: '400px', margin: 'auto' }}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'The input is not valid E-mail!' }
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Row>
                        <Col span={24}>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Sign Up
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item>
                    <div style={{ textAlign: 'center' }}>
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUp;
