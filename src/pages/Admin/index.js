import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { Tabs } from 'antd'; 
// import type { TabsProps } from 'antd';
import Adminintro from './Adminintro';
import AdminAbout from './AdminAbout';
import { useSelector } from 'react-redux';
import Experiences from './Experiences';
import AdminProjects from './AdminProjects';
import AdminCourses from './AdminCourses';
import AdminContact from './AdminContact';

const onChange = (key) => {
  // console.log(key);
};

const items = [
  {
    key: '1',
    label: 'Intro',
    children: <Adminintro ></Adminintro>,
  },
  {
    key: '2',
    label: 'About',
    children: <AdminAbout />,
  },
  {
    key: '3',
    label: 'Experiences',
    children:<Experiences></Experiences>,
  },
  {
    key: '4',
    label: 'Projects',
    children:<AdminProjects></AdminProjects>,
  },
  {
    key: '5',
    label: 'Courses',
    children:<AdminCourses></AdminCourses>,
  },
  {
    key: '6',
    label: 'Contact',
    children:<AdminContact></AdminContact>,
  },
];

const Admin = () => {
const {portfolioData} = useSelector((state) => state.root);

useEffect(() =>{
  if(!localStorage.getItem("token")){
    window.location.href = "/admin-login";
  }
},[])

  return (
    <div>
      <Header />
      <h1 className='underline text-primary font-bold border-spacing-2 cursor-pointer text-xl' onClick={() =>{
        localStorage.removeItem("token");
        window.location.href = "/admin-login";
      }}>Logout</h1>
      {/* Add Tabs component here */}
      {portfolioData && <div className='mt-5 p-5'>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabPosition='right'/>
      </div>}
    </div>
  );
};

export default Admin;
