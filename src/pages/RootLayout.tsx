import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation/MainNavigation';

const RootLayout: FC = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
