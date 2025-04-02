import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login.js';
import Register from './pages/Register';
import Home from './pages/Home';
import Layout from './pages/Layout';
import AddLoan from './pages/AddLoan';
import AddCustomers from './pages/AddCustomers.js';
import ViewAllCustomers from './pages/ViweAllCustomers.js';
import ViewAllUsers from './pages/ViewAllUsers.js';
import ViewAllLoans from './pages/ViewAllLoans.js';
import AddPayment from './pages/AddPayment.js';
import ViewAllPayments from './pages/ViewAllPayments.js';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard'; // Import UserDashboard

// Define your router with the Login route
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Use Layout for all routes
    children: [
      {
        path: '/Home', // Home page
        element: <Home />,
      },
      {
        path: '/', // Login page
        element: <Login />,
      },
      {
        path: '/register', // Register page
        element: <Register />,
      },

      {
        path: '/AddLoan', // Register page
        element: <AddLoan />,
      },
      {
        path: '/AddCustomers', // Register page
        element: <AddCustomers />,
      },
      {
        path: '/ViewAllCustomers', // Register page
        element: <ViewAllCustomers />,
      },
      {
        path: '/ViewAllUsers', // Register page
        element: <ViewAllUsers />,
      },
      {
        path: '/ViewAllLoans', // Register page
        element: <ViewAllLoans />,
      },
      {
        path: '/AddPayment', // Register page
        element: <AddPayment />,
      },
      {
        path: '/ViewAllPayments', // Register page
        element: <ViewAllPayments />,
      },
      {
        path: '/admin-dashboard', // Admin Dashboard page
        element: <AdminDashboard />,
      },
      {
        path: '/user-dashboard', // User Dashboard page
        element: <UserDashboard />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </RouterProvider>
  );
}

export default App;
