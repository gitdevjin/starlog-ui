import Fallback from "@/components/fallback/fallback";
import Loading from "@/components/fallback/loading";
import CreatePlanetButton from "@/components/planet/create-planet-button";
import PlanetItem from "@/components/planet/planet-item";
import { useInfinitePlanetsQuery } from "@/hooks/queries/use-infinite-planets";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function IndexPage() {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePlanetsQuery({ scope: "universe" });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loading />;

  return (
    <div className="flex flex-col gap-10">
      <CreatePlanetButton />

      {data.pages.map((page) =>
        page.map((planetId) => (
          <PlanetItem key={planetId} planetId={planetId} type={"LIST"} />
        ))
      )}
      {isFetchingNextPage && <Loading />}
      <div ref={ref}></div>
    </div>
  );
}
