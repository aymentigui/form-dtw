import { AppSidebar } from "@/componenets/app-sidebar"
import LogOutComp from "@/componenets/log-out"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-row justify-between">
            <SidebarTrigger className="mb-8"/>
            <LogOutComp ></LogOutComp>
          </div>
          {children}
        </div>
      </main>
      </SidebarProvider>
    </div>
  )
}

