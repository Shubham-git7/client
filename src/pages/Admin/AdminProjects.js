import { Modal, Form, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, reloadData, showLoading } from "../../redux/rootSlice";
import axios from "axios";

const AdminProjects = () => {
  const dispatch = useDispatch();
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  const onFinish = async (values) => {
    try {
      const tempTechnologies = values.technologies
        .split(",")
        .map((skill) => skill.trim());
      values.technologies = tempTechnologies;

      dispatch(showLoading());
      let response;

      // Send the experience directly instead of wrapping it in an array
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-project", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-project", values);
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
      console.error("Error:", error.response?.data); // Log the error response for debugging
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/portfolio/delete-project", {
        _id: item._id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(reloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Error deleting project: " + error.message);
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
          Add Projects
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="shadow-lg border border-gray-200 p-5 rounded-lg bg-white hover:shadow-xl transition transform"
          >
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              {project.title}
            </h3>
            <img
              src={project.image}
              alt={project.title}
              className="w-100 h-[200px] object-cover rounded mb-4" // Set fixed width and height
            />
            <p className="text-base font-medium mb-4">{project.title}</p>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => onDelete(project)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => {
                  setSelectedItemForEdit(project);
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

      {showAddEditModal && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Edit Projects" : "Add Projects"}
          footer={null}
          onCancel={() => setShowAddEditModal(false)}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              ...selectedItemForEdit,
              technologies: selectedItemForEdit?.technologies.join(", "),
            }}
          >
            <Form.Item name="title" label="Title" required>
              <input
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </Form.Item>
            <Form.Item name="image" label="Image URL" required>
              <input
                placeholder="Image"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </Form.Item>
            <Form.Item name="description" label="Description" required>
              <textarea
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </Form.Item>
            <Form.Item name="link" label="Link">
              <textarea
                placeholder="Link"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </Form.Item>
            <Form.Item name="technologies" label="Technologies" required>
              <input
                placeholder="Technologies"
                className="w-full p-2 border border-gray-300 rounded"
              />
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

export default AdminProjects;
