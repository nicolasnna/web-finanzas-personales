import { ReactNode } from 'react';
import BackgroundNumbers from './BackgroundNumbers';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='w-full'>
      <BackgroundNumbers/>
      <main className="flex flex-col h-full  w-full">
        <Navbar/>
        {children}
      </main>
    </div>
  );
}

export default Layout