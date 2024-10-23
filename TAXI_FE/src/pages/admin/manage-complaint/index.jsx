import React, { useEffect, useState } from "react";
import FormItem from "antd/es/form/FormItem";
import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";

import { toast } from "react-toastify";
import api from "../../../config/axiox";

function ManageComplaint() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get("/complaints/getAll");
      setDatas(response.data);
    } catch (error) {
      toast.error(error?.response?.data || "Failed to fetch data");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let response;
      if (values.complaintId) {
        // If complaintId exists, update the complaint
        response = await api.put(
          `/complaints/update/${values.complaintId}`,
          values
        );
      } else {
        // Otherwise, create a new complaint
        response = await api.post("/complaints/add", values);
      }
      toast.success("Successfully saved");
      fetchData(); // Reload data
      form.resetFields();
      setShowModal(false); // Close modal
    } catch (error) {
      toast.error(error?.response?.data || "Failed to save complaint");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Failed to delete complaint: Invalid ID");
      return;
    }

    try {
      await api.delete(`/complaints/delete/${id}`); // Make sure the id is passed correctly
      toast.success("Complaint deleted successfully");
      fetchData(); // Reload data after deletion to reflect changes
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to delete complaint";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "complaintId", key: "id" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Date",
      dataIndex: "submittedDate",
      key: "date",
      render: (submittedDate) => {
        const date = new Date(submittedDate);
        return date.toLocaleDateString("vi-VN"); // Formats the date as dd/MM/yyyy for Vietnam locale
      },
    },

    { title: "Ride_Id", dataIndex: "rideId", key: "rideId" },
    { title: "User_Id", dataIndex: "userId", key: "userId" },
    { title: "Status", dataIndex: "status", key: "status" },
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
              form.setFieldsValue(record);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Do you want to delete this complaint?"
            onConfirm={() => handleDelete(record.complaintId)}
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
      <Table dataSource={datas} columns={columns} rowKey="complaintId" />{" "}
      {/* Set rowKey to `complaintId` */}
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="Complaint"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="complaintId" hidden>
            <Input />
          </Form.Item>

          {/* <Form.Item
            name="userId"
            label="User_Id"
            rules={[
              {
                required: true,
                message: "Please input the UserID",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="rideId"
            label="Ride_Id"
            rules={[
              {
                required: true,
                message: "Please input the RideID",
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageComplaint;
