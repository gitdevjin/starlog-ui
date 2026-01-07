import CreatePlanetButton from "@/components/planet/create-planet-button";
import PlanetFeed from "@/components/planet/planet-feed";

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-10">
      <CreatePlanetButton />
      <PlanetFeed scope="universe" />
    </div>
  );
}
