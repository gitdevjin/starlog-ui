import type { PlanetFeedScope } from "@/api/planet";
import { useInfinitePlanetsQuery } from "@/hooks/queries/use-infinite-planets";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Fallback from "../fallback/fallback";
import Loading from "../fallback/loading";
import PlanetItem from "./planet-item";

export default function PlanetFeed({
  scope,
  creatorId,
}: {
  scope: PlanetFeedScope;
  creatorId?: string;
}) {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePlanetsQuery({ scope, creatorId });

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
