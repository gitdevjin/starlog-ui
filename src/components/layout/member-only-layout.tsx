import { Navigate, Outlet } from "react-router";
import GlobalLoading from "../fallback/global-loading";
import Footer from "../footer";
import Header from "./header/header";
import { SidebarProvider } from "../ui/sidebar";
import SideMenu from "./header/side-menu";
import { useSession } from "@/hooks/queries/use-session";

export default function MemberOnlyLayout() {
  const { data: user, isPending } = useSession();

  if (isPending) return <GlobalLoading />;
  if (!user) return <Navigate to="/sign-in" replace />;

  return (
    <SidebarProvider>
      <SideMenu />
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
