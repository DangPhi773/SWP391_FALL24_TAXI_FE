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
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPasswordPage from './pages/forgotPassword';
import JoinRide from './pages/joinRide';
import CreateRide from './pages/createRide';
import MyRides from './pages/myRides';

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
      path: "join-ride",
      element: <JoinRide />,
    },
    {
      path: "create-ride",
      element: <CreateRide />,
    },
    
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "my-rides",
      element: <MyRides />,
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