import { Modal, Form, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, reloadData, showLoading } from "../../redux/rootSlice";
import axios from "axios";

const Experiences = () => {
  const dispatch = useDispatch(); // Ensure this is properly invoked
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type = "add", setType] = React.useState("add");

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response;

      // console.log("Values to be sent:", values); // Log the values

      // Send the experience directly instead of wrapping it in an array
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-experience", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("https://server-portfolio-sfdo.onrender.com/api/portfolio/add-experience", values);
      }

      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        dispatch(hideLoading());
        dispatch(reloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong. Please try again.");
      console.error("Error:", error.response.data); // Log the error response for debugging
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("https://server-portfolio-sfdo.onrender.com/api/portfolio/delete-experience", {
        _id: item._id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);

        dispatch(hideLoading());
        dispatch(reloadData(true));
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
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="shadow-lg border border-gray-200 p-5 rounded-lg bg-white hover:shadow-xl transition transform"
          >
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              {experience.company}
            </h3>
            <p className="text-sm text-gray-500 mb-1">{experience.period}</p>
            <p className="text-base font-medium mb-4">{experience.title}</p>
            <p className="text-gray-700 mb-4">{experience.description}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => {
                  onDelete(experience);
                }}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => {
                  setSelectedItemForEdit(experience);
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
          title={selectedItemForEdit ? "Edit Experience" : "add experience"}
          footer={null}
          onCancel={() => setShowAddEditModal(false)}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedItemForEdit}
          >
            <Form.Item name="period" label="Period">
              <input placeholder="Period" />
            </Form.Item>
            <Form.Item name="company" label="Company">
              <input placeholder="Company" />
            </Form.Item>
            <Form.Item name="title" label="Title">
              <input placeholder="Title" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <input placeholder="Description" />
            </Form.Item>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                onClick={() => setShowAddEditModal(false)} // Close modal on cancel
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
export default Experiences;
