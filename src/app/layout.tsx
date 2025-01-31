

import SideBar from "@/components/SideBar";
import "./globals.css";
import QueryProvider from "./provider/QueryProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        
        <QueryProvider >
          <SidebarProvider>
            <SideBar/>
            <SidebarTrigger/>
        {children}
        <Toaster className="bg-black text-white" />
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
