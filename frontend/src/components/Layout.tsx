import { ReactNode } from 'react';
import AppSideBar from './AppSideBar';
import BackgroundNumbers from './BackgroundNumbers';
import Navbar from './Navbar';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={{"--sidebar-width": "230px"} as React.CSSProperties}
    > 
      <AppSideBar/>
      <BackgroundNumbers/>
      <main className="flex flex-col h-full  w-full">
        <Navbar/>
        <div className="absolute p-1 z-[100]">
          <SidebarTrigger className="size-12 [&_svg]:size-9 flex items-center justify-center cursor"/> 
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout