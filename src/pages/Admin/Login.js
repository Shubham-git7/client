import React from "react";
import { hideLoading, showLoading } from "../../redux/rootSlice";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const login = async() => {
    try {
        dispatch(showLoading);
        const response = await axios.post('/api/portfolio/admin-login', user);
        dispatch(hideLoading());
        if(response.data.success){
            message.success(response.data.message);
            localStorage.setItem("token", JSON.stringify(response.data));
            window.location.href = '/admin';
        }else{
            message.error(response.data.message);
        }
    }catch(error){
        message.error(error.message);
        dispatch(hideLoading());
    }
};



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Admin -SNG
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please login to your account
        </p>

        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow shadow-sm hover:shadow-lg"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow shadow-sm hover:shadow-lg"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-xl" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
