import GlobalLoading from "@/components/fallback/global-loading";
import { useSession } from "@/hooks/queries/use-session";
import type { ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const { data: user, isPending, error } = useSession();

  if (isPending) return <GlobalLoading />;

  return <>{children}</>;
}
