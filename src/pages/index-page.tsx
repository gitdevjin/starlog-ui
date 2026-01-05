import Fallback from "@/components/fallback/fallback";
import Loading from "@/components/fallback/loading";
import CreatePlanetButton from "@/components/planet/create-planet-button";
import PlanetFeed from "@/components/planet/planet-feed";
import PlanetItem from "@/components/planet/planet-item";
import { useInfinitePlanetsQuery } from "@/hooks/queries/use-infinite-planets";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-10">
      <CreatePlanetButton />
      <PlanetFeed scope="universe" />
    </div>
  );
}
