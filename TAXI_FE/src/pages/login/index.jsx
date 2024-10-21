import React from "react";
import AuthenTemplate from "../../components/authen-template";
import { Button, Form, Input } from "antd";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axiox";
import { toast } from "react-toastify";
import "./index.css";

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
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleLogin = async (values) => {
    try {
      const response = await api.post("/user/login", values);
      console.log(response);
      const { role, token } = response.data;
      localStorage.setItem("token", token);

      if (role === "ADMIN") {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <AuthenTemplate>
      <Form
        labelCol={{
          span: 24,
        }}
        onFinish={handleLogin}
      >
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Logo" className="w-24 mx-auto" />
        </div>

        <Form.Item
          label="Username or Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input user's email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="auth-links">
          <Link to="/register" className="register-link">Register new account</Link>
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password</Link>
        </div>

        <div
          className="flex gap-4 mt-4"
          style={{ justifyContent: "space-between" }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
            style={{ marginRight: "16px" }}
          >
            Login
          </Button>
          <Button onClick={handleLoginGoogle} className="login-google-button">
            Login by Google
          </Button>
        </div>
      </Form>
    </AuthenTemplate>
  );
}

export default LoginPage;
