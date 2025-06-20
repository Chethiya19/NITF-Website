import React from 'react';
import Header from './Header';
import SiderBar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './Agrahara.css';

const AgraharaLayout = () => {
  return (
    <div className="layout-container">
      <div className="sidebar-container">
        <SiderBar />
      </div>
      <div className="right-container">
        <Header />
        <main className="content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AgraharaLayout;
