import React from "react";
import { Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/rootSlice";
import axios from "axios";

const Adminintro = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const introData = portfolioData?.intro || {};
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/portfolio/update-intro", {
        ...values,
        _id: portfolioData.intro._id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 lg:px-16">
      <div className="bg-white shadow-xl rounded-lg p-8 lg:p-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Admin Introduction
        </h2>

        <Form
          onFinish={onFinish}
          className="space-y-6"
          initialValues={introData}
          layout="vertical"
        >
          {/* Welcome Text Field */}
          <Form.Item label={<span className="font-semibold">Welcome Text</span>} name="welcomeText">
            <Input
              placeholder="Welcome Text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </Form.Item>

          {/* First Name Field */}
          <Form.Item label={<span className="font-semibold">First Name</span>} name="firstName">
            <Input
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </Form.Item>

          {/* Last Name Field */}
          <Form.Item label={<span className="font-semibold">Last Name</span>} name="LastName">
            <Input
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </Form.Item>

          {/* Caption Field */}
          <Form.Item label={<span className="font-semibold">Caption</span>} name="caption">
            <Input
              placeholder="Caption"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </Form.Item>

          {/* Description Field */}
          <Form.Item label={<span className="font-semibold">Description</span>} name="description">
            <Input.TextArea
              placeholder="Description"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </Form.Item>

          {/* Save Button */}
          <Form.Item className="text-center">
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              type="submit"
            >
              Save
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Adminintro;
