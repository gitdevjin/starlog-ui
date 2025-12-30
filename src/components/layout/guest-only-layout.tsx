import { useUser } from "@/store/user-store";
import { Navigate, Outlet } from "react-router";

export default function GuestOnlyLayout() {
  const user = useUser();
  if (user) return <Navigate to={"/"} replace={true} />;
  return <Outlet />;
}
