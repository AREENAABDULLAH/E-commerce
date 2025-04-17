import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await fetch('https://ecommerce-backend-i2i3ccoht-areenas-projects-27450e95.vercel.app/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if (res.ok) {
                alert('Login successful!');
                // Optionally store user data
                // localStorage.setItem("user", JSON.stringify(data.user));
                navigate('/'); // Redirect to home page
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Something went wrong');
        }
    };

    return (
        <div style={{ padding: '50px' }}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
                style={{ maxWidth: '400px', margin: 'auto' }}
            >
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
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item>
                    <div style={{ textAlign: 'center' }}>
                        Don't have an account? <Link to="/signup">Create one here</Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
