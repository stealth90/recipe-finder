import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-y-4">
      <Header />
      <main className='flex flex-1 justify-center'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
