import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axiox";
import { toast } from "react-toastify";

function ManageLocation() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Fetch location data
  const fetchData = async () => {
    try {
      const response = await api.get("locations");
      setDatas(response.data);
    } catch (error) {
      toast.error(error?.response?.data || "Failed to fetch data");
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let response;
      if (values.locationId) {
        // If ID exists, update the location
        response = await api.put(`locations/${values.locationId}`, values);
      } else {
        // Otherwise, create a new location
        response = await api.post("locations", values);
      }

      toast.success("Successfully saved");
      fetchData(); // Reload data
      form.resetFields();
      setShowModal(false); // Close modal
    } catch (error) {
      toast.error(error?.response?.data || "Failed to save location");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await api.delete(`locations/{id}`, id);
      toast.success("Successfully deleted");
      fetchData(); // Reload data after deletion
    } catch (error) {
      toast.error(error?.response?.data || "Failed to delete location");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Define table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "locationId", // Should match your entity field
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "locationName", // Should match your entity field
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
      key: "action",
      render: (id, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldsValue(record); // Pre-populate form fields
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Do you want to delete this location?"
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
      <Table dataSource={datas} columns={columns} rowKey="locationId" />{" "}
      {/* Set rowKey to `locationId` */}
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="Location"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="locationId" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="locationName" // Updated to match your entity structure
            label="Name"
            rules={[
              { required: true, message: "Please input the location's name" },
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
