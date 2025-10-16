import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-y-4">
      <Header />
      <main className="max-w-6xl flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
