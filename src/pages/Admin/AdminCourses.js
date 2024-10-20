import { Modal, Form, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, reloadData, showLoading } from "../../redux/rootSlice";
import axios from "axios";

const AdminCourses = () => {
  const dispatch = useDispatch();
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response;

      // console.log("Values to be sent:", values);

      if (selectedItemForEdit) {
        response = await axios.post("https://server-portfolio-sfdo.onrender.com/api/portfolio/update-course", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("https://server-portfolio-sfdo.onrender.com/api/portfolio/add-course", values);
      }

      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        dispatch(reloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong. Please try again.");
      console.error("Error:", error.response.data);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/portfolio/delete-course", {
        _id: item._id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(reloadData(true));
        form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-100">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add Courses
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="shadow-lg border border-gray-200 p-5 rounded-lg bg-white hover:shadow-xl transition transform"
          >
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              {course.title}
            </h3>
            <img
              src={course.image}
              alt={course.title}
              className="w-32 h-32 object-cover rounded mb-4" // Fixed image size
            />
            <p className="text-base font-medium mb-4">{course.title}</p>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => {
                  onDelete(course);
                }}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => {
                  setSelectedItemForEdit(course);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Edit Course" : "Add Course"}
          footer={null}
          onCancel={() => setShowAddEditModal(false)}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              ...selectedItemForEdit,
            }}
          >
            <Form.Item name="title" label="Title">
              <input placeholder="Title" />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <input placeholder="Image" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <textarea placeholder="Description" />
            </Form.Item>
            <Form.Item name="link" label="Link">
              <textarea placeholder="Link" />
            </Form.Item>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                onClick={() => setShowAddEditModal(false)}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default AdminCourses;
