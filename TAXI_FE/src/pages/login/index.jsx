import React from 'react'
import AuthenTemplate from '../../components/authen-template'
import { Button, Form, Input } from 'antd';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../../config/firebase';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../config/axiox';
import { toast } from 'react-toastify';

function LoginPage() {

const navigate = useNavigate();
const handleLoginGoogle = () => {
    const auth = getAuth();
signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

const handleLogin = async (values) => {
    try {
        const response = await api.post("login", values);
        console.log(response);
        const {role, token} = response.data;
        localStorage.setItem("token", token);

        if(role === "ADMIN"){
            navigate("/dashboard");
        }

    } catch (error) {
        toast.error(error.response.data);
    }
};

  return <AuthenTemplate>
    <Form labelCol={{
        span: 24,
    }}
    onFinish={handleLogin}
    >
        <Form.Item label="Username or Email" name="email" rules={[
            {
                required:true,
                message:"Please input student's email",
            },
        ]}>
            <Input/>
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[
            {
                required:true,
                message:"Please input password",
            },
        ]}
        >
            <Input.Password/>
        </Form.Item>
        <div><Link to="/register"> Dont have account? Register new account </Link></div>

        <Button type="primary" htmlType="submit">Login</Button>

        <Button onClick={handleLoginGoogle}>Login by Google</Button>

    </Form>
    </AuthenTemplate>
  
}

export default LoginPage;