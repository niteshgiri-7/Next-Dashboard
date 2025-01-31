"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
export default function SideBar() {
  const pathname = usePathname(); 

  const navItems = ["categories", "products"];

  return (
   
      <Sidebar>
        <SidebarContent className="">
          <SidebarGroup>
            <SidebarGroupLabel className="font-bold text-xl">Dashboard</SidebarGroupLabel>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname?.includes(item); 
                return (
                  <SidebarMenuItem key={item}>
                    <Link href={`/${item}`} className={`block text-lg font-bold mt-3 p-2 ${isActive ? 'bg-gray-400  text-white rounded-lg' : 'text-gray-400'}`}>
                        <span>{item}</span>
               
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  
  );
}
