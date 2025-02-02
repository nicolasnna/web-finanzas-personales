import { DollarSign, Home, Receipt } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { URLS } from "@/utils/constants"

const items = [
  {
    title: "Home",
    url: URLS.HOME,
    icon: Home
  },
  { title: "Ingresos",
    url:  URLS.INCOMES,
    icon: DollarSign
  },
  {
    title: "Gastos",
    url: URLS.EXPENSES,
    icon: Receipt
  }
]


const AppSideBar = () => {

  return (
    <Sidebar className="z-50">
      <SidebarHeader className="p-4">
        <h1 className="text-2xl font-bold text-orange-950">Menu</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item, index) => (
            <SidebarMenuItem key={index} className="px-3 ">
              <SidebarMenuButton asChild size={'lg'} >
                <a href={item.url} >
                  <item.icon className="scale-150"  />
                  <span className="ml-2 text-base">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter >
        <h2 className="text-lg font-bold text-orange-950">Finanzas personales</h2>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSideBar