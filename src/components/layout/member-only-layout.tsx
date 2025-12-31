import { Navigate, Outlet } from "react-router";
import GlobalLoading from "../fallback/global-loading";
import Fallback from "../fallback/fallback";
import { useUserQuery } from "@/hooks/queries/use-user-query";
import Footer from "../footer";
import Header from "./header/header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";
import background from "@/assets/background.jpg";
import { useState } from "react";

export default function MemberOnlyLayout() {
  const { data: user, isPending, error } = useUserQuery();
  const [open, setOpen] = useState(false);

  if (isPending) return <GlobalLoading />;
  if (error) return <Fallback />;
  if (!user) return <Navigate to={"/sign-in"} replace={true} />;

  return (
    <SidebarProvider>
      <Sidebar className="">
        <SidebarContent className="bg-background/80 z-0">
          <SidebarMenuItem>hello</SidebarMenuItem>
        </SidebarContent>
      </Sidebar>
      <main className="w-full flex-3 justify-center px-1 pb-4">
        <div className={`mx-auto flex w-full max-w-200 flex-col px-6`}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </main>
    </SidebarProvider>
  );
}
