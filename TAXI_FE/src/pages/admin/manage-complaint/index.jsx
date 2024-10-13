import React, { useEffect, useState } from "react";
import FormItem from "antd/es/form/FormItem";
import { Button, Form, Input, Modal, Table } from "antd";
import api from "../../../config/axiox";
import { toast } from "react-toastify";

function ManageComplaint() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get("complaints/getAll");
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
        response = await api.put(`complaints/updateByUser/{id}`, values);
      } else {
        response = await api.post("complaints/add", values);
      }

      toast.success("Successfully saved");
      fetchData();
      form.resetFields();
      setShowModal(false);
    } catch (error) {
      toast.error(error?.response?.data || "Failed to save complaint");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`complaints/delete/{id}`);
      toast.success("Successfully deleted");
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data || "Failed to delete complaint");
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

    // { title: "Ride_Id",
    //   dataIndex:"submittedDate",
    //   key: "rideId",
    // },
    // { title: "User_Id",
    //   dataIndex:"submittedDate",
    //   key: "UserId",
    // },
  ];

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add</Button>
      <Table dataSource={datas} columns={columns} rowKey="complaintId" />{" "}
      {/* Set rowKey to `locationId` */}
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
            name="locationName"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the Complaint description",
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
