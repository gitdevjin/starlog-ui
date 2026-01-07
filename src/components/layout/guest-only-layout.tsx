import { useSession } from "@/hooks/queries/use-session";
import { Navigate, Outlet } from "react-router";

export default function GuestOnlyLayout() {
  const { data: user } = useSession();

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}
