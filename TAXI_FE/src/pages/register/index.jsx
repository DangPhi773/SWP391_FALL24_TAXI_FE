import React from 'react'
import AuthenTemplate from '../../components/authen-template';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../config/axiox';
import { toast } from 'react-toastify';

function RegisterPage() {
    const navigate = useNavigate();

    const handleRegister = async (values) => {
        try {
            values,role = "CUSTOMER";
            const response = await api.post('register', values);
            toast.success("Successfully register new account ");
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data);
        }

    };



  return <AuthenTemplate>
    <Form
  labelCol={{
    span: 24,
  }}
  onFinish={handleRegister}
>
  <Form.Item
    label="Username"
    name="username"
    rules={[
      { required: true, message: 'Please input your username!' },
    ]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Password"
    name="password"
    rules={[
      { required: true, message: 'Please input your password!' },
      { min: 6, message: 'Password must be at least 6 characters long!' },
    ]}
    hasFeedback
  >
    <Input.Password />
  </Form.Item>

  <Form.Item
    label="Confirm Password"
    name="confirmPassword"
    dependencies={['password']}
    hasFeedback
    rules={[
      { required: true, message: 'Please confirm your password!' },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('The two passwords do not match!'));
        },
      }),
    ]}
  >
    <Input.Password />
  </Form.Item>

  <Form.Item
    label="Fullname"
    name="fullname"
    rules={[
      { required: true, message: 'Please input your full name!' },
    ]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Email"
    name="email"
    rules={[
      { required: true, message: 'Please input your email!' },
      {
        type: 'email',
        message: 'Please enter a valid email!',
      },
    ]}
  >
    <Input />
  </Form.Item>

  <Link to="/login"> Already have account? Go to Login Page </Link>
  
  <Button type="primary" htmlType="submit">
    Register
    </Button>

</Form>
  </AuthenTemplate>
}

export default RegisterPage;