import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './Navigationbar'; // Navigation bar component

const Layout = () => {
  return (
    <div>
      <NavigationBar />
      <main>
        <Outlet /> {/* Renders the current page content */}
      </main>
    </div>
  );
};

export default Layout;
