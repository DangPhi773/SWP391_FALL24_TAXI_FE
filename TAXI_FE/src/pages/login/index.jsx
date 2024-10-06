import { Button, Form, Input } from "antd";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";

function LoginPage( ){


const handleLogin =  async (values)=> {
    try{
        const response = await 
    }
};

return(
    <AuthenTemplate>
<Form labelCol={{
    span: 24,
}}
    onFinish={handleLogin}
>

</Form>

    </AuthenTemplate>


    );
}

export default LoginPage;