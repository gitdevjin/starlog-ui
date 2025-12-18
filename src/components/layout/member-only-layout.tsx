// import { useSession } from "@/store/session";
import { useUser } from "@/store/user-store";
import { Navigate, Outlet } from "react-router";

export default function MemberOnlyLayout() {
  const user = useUser();
  if (!user) return <Navigate to={"/sign-in"} replace={true} />;

  return <Outlet />;
}
