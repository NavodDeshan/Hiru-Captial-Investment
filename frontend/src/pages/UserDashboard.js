import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import './../css/UserDashboard.css'; // Ensure you have a CSS file for styling

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Retrieve id and token from local storage
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');

        console.log('Retrieved ID:', id); // Debugging: Check if ID is retrieved
        console.log('Retrieved Token:', token); // Debugging: Check if Token is retrieved

        if (!id || !token) {
          setError('User ID or token not found. Redirecting to login...');
          setLoading(false);
          setTimeout(() => navigate('/'), 2000); // Redirect to login after 2 seconds
          return;
        }

        // Fetch user profile using id
        const response = await axios.get(`http://localhost:5000/api/users/user/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        });

        console.log('User Profile Response:', response.data); // Debugging: Check API response
        setUser(response.data); // Set the user data
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error('Error fetching user profile:', err); // Debugging: Log the error

        if (err.response && err.response.status === 404) {
          setError('User profile not found. Please check your account.');
        } else if (err.response && err.response.status === 401) {
          setError('Unauthorized. Please log in again.');
          setTimeout(() => navigate('/'), 2000); // Redirect to login after 2 seconds
        } else {
          setError('Failed to fetch user profile. Please try again later.');
        }

        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchUserProfile();
  }, [navigate]); // Include navigate in dependency array

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      {/* User Profile Section */}
      <div className="user-profile">
        <h2>User Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* User Actions Section */}
      <div className="user-actions">
        <Link to="/AddLoan" className="user-action">Add Loans</Link>
        <Link to="/AddPayment" className="user-action">Add Payment</Link>
      </div>

     
      
    </div>
  );
};

export default UserDashboard;
