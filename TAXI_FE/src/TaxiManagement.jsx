import { Button, Form, Input, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/es/skeleton/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function TaxiManagement() {
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = useForm();

  const api = "https://66e47912d2405277ed146bcb.mockapi.io/Student";

  const fetchStudent = async () => {
    const response = await axios.get(api);
    console.log(response.data);
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  }
  const handleCloseModal = () => {
    setOpenModal(false);
  }
  const handleSubmitStudent = async (student) => {
    console.log(student);
    try {
        setSubmitting(true);
        const response = await axios.post(api, student)
        toast.success('Successfully')
        setOpenModal(false);
        
        form.resetFields();

        fetchStudent()
    }catch (error) {
        toast.error(error);
    }finally{
        setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Taxi Management</h1>
        <Button onClick={handleOpenModal}>Create new student</Button>
      <Table columns={columns} dataSource={students} />
      <Modal confirmLoading={submitting} onOk={() => form.submit()} title="Create new student" open={openModal} onCancel={handleCloseModal}>
        <Form onFinish={handleSubmitStudent} form={form}>
            <Form.Item label="Student name" name="name" rules={[
                {
                    required:true,
                    message:"Please input student's name",
                }

            ]}
            >

                <Input />
            </Form.Item>

            <Form.Item label="Student code" name="code" rules={[
                {
                    required:true,
                    message:"Please input student's code",
                },
                {
                    pattern: "SE\\d{6}$"
                    message:"Invalid format",
                },
            ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Student " name="code" rules={[
                {
                    required:true,
                    message:"Please input student's code",
                },
                {
                    pattern: "SE\\d{6}$",
                    message:"Invalid format",
                },
            ]}
            >
                <Input />
            </Form.Item>


        </Form>
      </Modal>
    </div>
  );
}

export default TaxiManagement;
