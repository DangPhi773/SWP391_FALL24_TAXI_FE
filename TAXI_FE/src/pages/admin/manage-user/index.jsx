import { Button, Form, Image, Input, Modal, Popconfirm, Table, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/es/skeleton/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlusOutlined } from '@ant-design/icons';
import uploadFile from "../../../utils/file";
import api from "../../../config/axiox";


function ManageUser() {
  const [datas, setDatas] = useState([]);
  const [user, setUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get("v1/user/getAllUser");
      setDatas(response.data);
    } catch (error) {
      toast.error(error?.response?.data || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
        title: "ID",
        dataIndex: "userId",
        key: "id",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (image) => {
          return <Image src={image} alt="" width={100}></Image>;
        },
      },
      {
        title: "Name",
        dataIndex: "fullName",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "code",
      },
      {
        title: "Action",
        dataIndex: "userId",
        key: "id",
        render: (id) => {
            return <>
                <Popconfirm title="Delete" 
                description="Do you want delete this user"
                onConfirm={() => handleDeleteStudent(id)}
                >
                <Button type="primary" danger>
                    Delete
                </Button>
                </Popconfirm>               
            </>
        }
    },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  }
  const handleCloseModal = () => {
    setOpenModal(false);
  }
  const handleSubmitStudent = async (user) => {

    if(fileList.length > 0){
        const file = fileList[0];
        console.log(file);
        const url = await uploadFile(file.originFileObj);
        user.image = url;
    }

    console.log(user);
    try {
      setLoading(true);
      let response;
      if (user.userId) {
        response = await api.put(`v1/user/updateUser/${user.userId}`,user); 
      } else {
        response = await api.post("v1/user/registerNewUser", user);
      }
      toast.success("Successfully saved");
      fetchData(); 
      form.resetFields();
      setShowModal(false); 
    } catch (error) {
      toast.error(error?.response?.data || "Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (userId) => {
    if (!userId) {
      toast.error("Failed to delete user: Invalid ID");
      return;
    }
    try {
      await api.delete(`v1/user/deleteUser/${userId}`); 
      toast.success("User deleted successfully");
      fetchData(); 
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to delete user";
      toast.error(errorMessage);
    }
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
      };
      const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
      const uploadButton = (
        <button
          style={{
            border: 0,
            background: 'none',
          }}
          type="button"
        >
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </button>
      );

  return (
    <div>
      
        <Button onClick={handleOpenModal}>Create new user</Button>
      <Table columns={columns} dataSource={user} />
      <Modal confirmLoading={submitting} onOk={() => form.submit()} title="Create new user" open={openModal} onCancel={handleCloseModal}>
        <Form onFinish={handleSubmitStudent} form={form}>
            <Form.Item label="User's name" name="name" rules={[
                {
                    required:true,
                    message:"Please input User's name",
                }
            ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="User's Role" name="code" rules={[
                {
                    required:true,
                    message:"Please input user's role",
                },                
            ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Email " name="email" rules={[
                {
                    required:true,
                    message:"Please input student's email",
                },
                {
                  pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                  message: "Invalid email format",
                },
            ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="User's Password" name="password" rules={[
                {
                    required:true,
                    message:"Please input user's password",
                },                
            ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="image" name="image">
            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
            </Form.Item>

        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default ManageUser;
