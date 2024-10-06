import React from 'react'
import AuthenTemplate from '../../components/authen-template'
import { Button, Form, Input } from 'antd';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../../config/firebase';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

function LoginPage() {

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

const handleLogin = () => {

}

  return <AuthenTemplate>
    <Form labelCol={{
        span: 24,
    }}>
        <Form.Item label="Username" name="username" rules={[
            {
                required:true,
                message:"Please input student's name",
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

        <Button>Login</Button>

        <Button onClick={handleLoginGoogle}>Login by Google</Button>

    </Form>
    </AuthenTemplate>
  
}

export default LoginPage;