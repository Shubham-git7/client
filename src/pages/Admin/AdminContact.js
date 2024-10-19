import React from "react";
import { Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/rootSlice";
import axios from "axios";

const AdminContact = () => {
  // Get the portfolioData from the Redux store
  const { portfolioData } = useSelector((state) => state.root);

  // Access the intro part from portfolioData
  const ContactData = portfolioData?.Contact || {};
  const dispatch = useDispatch();

  // Handle form submission
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.Contact._id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        // Show success message using Ant Design's message component
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
          Contact INFO
        </h2>

        {/* Set initial values from introData */}
        <Form
          onFinish={onFinish}
          className="space-y-6"
          initialValues={ContactData}
          layout="vertical"
        >
          {/* Last Name Field */}
          <Form.Item label="name" name="name">
            <Input
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              defaultValue={ContactData.name}
            />
          </Form.Item>

          {/* Caption Field */}
          <Form.Item label="Gender" name="gender">
            <Input
              placeholder="Gender"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              defaultValue={ContactData.gender}
            />
          </Form.Item>
          <Form.Item label="Age" name="age">
            <Input
              placeholder="Age"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              defaultValue={ContactData.gender}
            />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              defaultValue={ContactData.email}
            />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input
              placeholder="Country"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              defaultValue={ContactData.mobile}
            />
          </Form.Item>
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

export default AdminContact;
