import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import Feedback from './pages/feedBack';

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage />,
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
          path: "my-rides",
          element: <MyRides />,
        },
        {
          path: "feedback/:rideId",
          element: <Feedback />,
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
      path: "forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "locations",
          element: <ManageLocation />
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

  return <RouterProvider router={router} />;
}

export default App;
