import MoonEditor from "@/components/moon/moon-editor";
import MoonList from "@/components/moon/moon-list";
import PlanetItem from "@/components/planet/planet-item";
import { Navigate, useParams } from "react-router";

export default function PlanetDetailPage() {
  const params = useParams();
  const planetId = params.planetId;
  if (!planetId) return <Navigate to={"/"} />;
  return (
    <div>
      <PlanetItem planetId={Number(planetId)} type={"DETAIL"} />
      <div className="text-xl font-bold m-2">Moons</div>
      <MoonEditor planetId={Number(planetId)} type={"CREATE"} />
      <MoonList planetId={Number(planetId)} />
    </div>
  );
}
