import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import api from '../../../config/axiox';
import { toast } from 'react-toastify';

function ManageLocation() {

    const [datas, setDatas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {           
            const response = await api.get("location");
            setDatas(response.data);
        } catch (error) {
            toast.error(error.response.data);
            
        }

    };

    const handleSubmit = async (values) => {
        
        try {
            setLoading(true);
            if(values.id){
                const response = await api.put(`location/${values.id}`, values);
            }else{
                const response = await api.post("location", values);
            }

           const response = await api.post("location",values);
           toast.success("Successfully saved");
           fetchData();
           form.resetFields();
           setShowModal(false);
        } catch (error) {
            toast.error(error.response.data);
        }finally{
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`location/${id}`);
            toast.success("Successfully deleted");
            fetchData();
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Action",
        dataIndex: "id",
        key: "id",
        render: (id, category) => (
            <>
            <Button type="primary" 
            onClick={() => { 
                setShowModal(true);
                form.setFieldValue(category);

            }}
            >
                Edit
            </Button>

            <Popconfirm title="Delete" description="Do you want to delete this location"
                        onConfirm={() => handleDelete(id)}
            >
            <Button type="primary" danger>
                Delete
            </Button>
            </Popconfirm>            
            </>
        ),
    },
];


  return (       
    <div>
        <Button onClick={() => setShowModal(true)}>Add</Button>
        <Table dataSource={datas} columns={columns} />

        <Modal open={showModal} 
        onCancel={() => setShowModal(false)} 
        title="Location"
        onOk={() => form.submit()}
        confirmLoading={loading}
        >
            <Form form={form}
                labelCol={{
                    span:24,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="locationName" label="Name" rules={[
                    {
                        required: true,
                        message: "Please input location's name",
                    }
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
            </Form>            
        </Modal>
    </div>
  );
}

export default ManageLocation;