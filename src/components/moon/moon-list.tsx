import { useMoonQuery } from "@/hooks/queries/use-moon-query";
import type { Moon, NestedMoon } from "@/types";
import Fallback from "../fallback/fallback";
import Loading from "../fallback/loading";
import MoonItem from "./moon-item";

export function toNestedMoon(moons: Moon[]): NestedMoon[] {
  const result: NestedMoon[] = [];

  const moonMap = new Map<number, Moon>();
  const rootMap = new Map<number, NestedMoon>();

  // Index all moons
  moons.forEach((moon) => {
    moonMap.set(moon.id, moon);
  });

  // Build root layer explicitly
  moons.forEach((moon) => {
    if (moon.rootMoonId === null) {
      const root: NestedMoon = {
        ...moon,
        children: [],
      };
      result.push(root);
      rootMap.set(moon.id, root);
    }
  });

  // Attach replies (flatten deeper levels)
  moons.forEach((moon) => {
    if (moon.rootMoonId !== null) {
      const root = rootMap.get(moon.rootMoonId!);
      if (!root) return;

      const parentMoon = moonMap.get(moon.parentMoonId!);

      root.children.push({
        ...moon,
        children: [],
        parentMoon, // for @mention
      });
    }
  });

  return result;
}

export default function MoonList({ planetId }: { planetId: number }) {
  const {
    data: moons,
    error: fetchMoonsError,
    isPending: isFetchMoonsPending,
  } = useMoonQuery(planetId);

  if (fetchMoonsError) return <Fallback />;
  if (isFetchMoonsPending) return <Loading />;

  const nestedMoons = toNestedMoon(moons);

  return (
    <div className="flex flex-col gap-5">
      {nestedMoons.map((moon) => (
        <MoonItem key={moon.id} {...moon} />
      ))}
    </div>
  );
}
