import React from 'react'
import {  createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import HomePage from './pages/home';
import Dashboard from './components/dashboard';
import ManageLocation from './pages/admin/manage-location';
import ManageTrip from './pages/admin/manage-trip';
import ManageComplaint from './pages/admin/manage-complaint';
import Layout from './components/layout';
import ManageUser from './pages/admin/manage-user';


function App() {
  const Router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      children:[
        {
          path: "locations",
          element: <ManageLocation />
        },
        {
          path: "trip",
          element: <ManageTrip />
        },
        {
          path: "complaint",
          element: <ManageComplaint />
        },
        {
          path: "user",
          element: <ManageUser />
        },
      ],
    },
    
  ]);


  return <RouterProvider router={Router} />
  
}

export default App;