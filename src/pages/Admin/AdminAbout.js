import React from "react";
import { Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/rootSlice";
import axios from "axios";

const Adminabout = () => {
  // Get the portfolioData from the Redux store
  const { portfolioData } = useSelector((state) => state.root);

  // Access the about part from portfolioData  
  const aboutData = portfolioData?.about || {};
  const dispatch = useDispatch();

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",").map(skill => skill.trim()); // Split and trim skills
      values.skills = tempSkills;

      dispatch(showLoading());
      const response = await axios.post("/api/portfolio/update-about", {
        ...values,
        _id: portfolioData.about._id,
      });
      dispatch(hideLoading());

      if (response.data.success) {
        message.success(response.data.message);  // Show success message
      } else {
        message.error(response.data.message); // Show error message from backend
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong. Please try again.");  // Fallback error message
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 lg:px-16">
      <div className="bg-white shadow-xl rounded-lg p-8 lg:p-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Admin About
        </h2>

        {/* Set initial values from aboutData */}
        <Form
          onFinish={onFinish}
          className="space-y-6"
          initialValues={{
            LottieURL: aboutData.lottieURL,
            description1: aboutData.description1,
            description2: aboutData.description2,
            skills: aboutData.skills.join(", "), // Join skills with a comma
          }}
          layout="vertical"
        >
          {/* LottieURL Field */}
          <Form.Item label={<span className="font-semibold">Lottie URL</span>} name="LottieURL">
            <Input
              placeholder="Lottie URL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </Form.Item>

          {/* Description 1 Field */}
          <Form.Item label={<span className="font-semibold">Description 1</span>} name="description1">
            <Input
              placeholder="Description 1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </Form.Item>

          {/* Description 2 Field */}
          <Form.Item label={<span className="font-semibold">Description 2</span>} name="description2">
            <Input.TextArea
              placeholder="Description 2"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </Form.Item>

          {/* Skills Field */}
          <Form.Item label={<span className="font-semibold">Skills</span>} name="skills">
            <Input.TextArea
              placeholder="Skills (comma-separated)"
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

export default Adminabout;
