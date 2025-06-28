import { ReactNode } from 'react';
import BackgroundNumbers from './BackgroundNumbers';
import Navbar from './Navbar';
import { Toaster } from './ui/sonner';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='w-full'>
      <Toaster/>
      <BackgroundNumbers/>
      <main className="flex flex-col h-full w-full">
        <Navbar/>
        {children}
      </main>
    </div>
  );
}

export default Layout