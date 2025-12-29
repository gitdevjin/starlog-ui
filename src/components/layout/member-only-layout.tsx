// import { useSession } from "@/store/session";
import { useUser } from "@/store/user-store";
import { Navigate, Outlet } from "react-router";
import GlobalLoading from "../fallback/global-loading";
import Fallback from "../fallback/fallback";
import { useUserQuery } from "@/hooks/queries/use-user-query";

export default function MemberOnlyLayout() {
  const { data: user, isPending, error } = useUserQuery();

  if (isPending) return <GlobalLoading />;
  if (error) return <Fallback />;
  if (!user) return <Navigate to={"/sign-in"} replace={true} />;

  return <Outlet />;
}
