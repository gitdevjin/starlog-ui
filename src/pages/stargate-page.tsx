import PlanetFeed from "@/components/planet/planet-feed";
import StargateInfo from "@/components/stargate/stargate-info";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";

export default function StargatePage() {
  const params = useParams();
  const userId = params.userId;

  if (!userId) return <Navigate to={"/"} replace />;

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="flex flex-col gap-10 pt-2">
      <StargateInfo userId={userId} />
      <div className="border-b"></div>
      <PlanetFeed scope={"star"} creatorId={userId} />
    </div>
  );
}
