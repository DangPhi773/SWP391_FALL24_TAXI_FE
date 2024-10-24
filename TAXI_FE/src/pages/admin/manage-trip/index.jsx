import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Popconfirm, Table, DatePicker, TimePicker, InputNumber, Select } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axiox";
import moment from "moment";

function ManageTrip() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get("/rides/getAll");
      setDatas(response.data);
    } catch (error) {
      toast.error(error?.response?.data || "Failed to fetch data");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { rideDate, startTime, endTime, ...rest } = values;
      const formattedValues = {
        ...rest,
        rideDate: rideDate.format("YYYY-MM-DD"),
        startTime: startTime.format("YYYY-MM-DDTHH:mm:ss"),
        endTime: endTime.format("YYYY-MM-DDTHH:mm:ss"),
      };

      let response;
      if (values.rideId) {
        // If rideId exists, update the ride
        response = await api.put(`/rides/update/${values.rideId}`, formattedValues);
      } else {
        // Otherwise, create a new ride
        response = await api.post("/rides/add", formattedValues);
      }
      toast.success("Successfully saved");
      fetchData(); // Reload data
      form.resetFields();
      setShowModal(false); // Close modal
    } catch (error) {
      toast.error(error?.response?.data || "Failed to save ride");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Failed to delete ride: Invalid ID");
      return;
    }

    try {
      await api.delete(`/rides/delete/${id}`);
      toast.success("Ride deleted successfully");
      fetchData(); // Reload data after deletion to reflect changes
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to delete ride";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "rideId", key: "rideId" },
    { title: "Ride Code", dataIndex: "rideCode", key: "rideCode" },
    { title: "Date", dataIndex: "rideDate", key: "rideDate" },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime) => moment(startTime).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime) => moment(endTime).format("YYYY-MM-DD HH:mm:ss"),
    },
    { title: "Capacity", dataIndex: "capacity", key: "capacity" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      dataIndex: "rideId", // Use rideId as the key for actions
      key: "action",
      render: (rideId, record) => (
        <div style={{ display: 'flex', gap: '10px' }}> 
          <div>
            <Button
              type="primary"
              onClick={() => {
                setShowModal(true);
                form.setFieldsValue({
                  ...record,
                  rideDate: moment(record.rideDate),
                  startTime: moment(record.startTime),
                  endTime: moment(record.endTime),
                }); // Set the form fields with the selected record values
              }}
            >
              Edit
            </Button>
          </div>
          <div>
            <Popconfirm
              title="Delete"
              description="Do you want to delete this ride?"
              onConfirm={() => handleDelete(rideId)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add Ride</Button>
      <Table dataSource={datas} columns={columns} rowKey="rideId" />
      {/* Set rowKey to `rideId` */}
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="Ride"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="rideId" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="rideCode"
            label="Ride Code"
            rules={[{ required: true, message: "Please input the ride code" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="rideDate"
            label="Ride Date"
            rules={[{ required: true, message: "Please select the ride date" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true, message: "Please select the start time" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true, message: "Please select the end time" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: "Please input the capacity" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price" }]}
          >
            <InputNumber min={0} step={0.01} />
          </Form.Item>

          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[{ required: true, message: "Please select the payment method" }]}
          >
            <Select>
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="Credit Card">Credit Card</Select.Option>
              <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please input the status" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageTrip;