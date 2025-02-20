import React from 'react';
import Navbar from './NavBar'; // Import your existing Navbar component
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar /> {/* This will be present on all pages */}
      <main>
        <Outlet /> {/* Content of the routes will be rendered here */}
      </main>
    </div>
  );
};

export default Layout;
