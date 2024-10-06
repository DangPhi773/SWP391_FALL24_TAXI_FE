import React from 'react'
import {  createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import HomePage from './pages/home';
import Dashboard from './components/dashboard';

function App() {
  const Router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
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
    },
    
  ]);


  return <RouterProvider router={Router} />
  
}

export default App;