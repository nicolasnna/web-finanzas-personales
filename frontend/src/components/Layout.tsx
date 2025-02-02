import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import AppSideBar from './AppSideBar';
import BackgroundNumbers from './BackgroundNumbers';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider
      style={{"--sidebar-width": "230px"} as React.CSSProperties}
    > 
      <AppSideBar/>
      <main className="flex flex-col h-full  w-full">
        <BackgroundNumbers/>
        <Navbar/>
        <div className="absolute z-10 p-1">
          <SidebarTrigger  className="size-12 [&_svg]:size-9 flex items-center justify-center"/> 
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout