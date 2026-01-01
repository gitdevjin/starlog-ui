import { AppleIcon, BinocularsIcon, OrbitIcon } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router";
import { usePlanetByIdQuery } from "@/hooks/queries/use-planet-by-id";
import { useUser } from "@/store/user-store";
import Fallback from "../fallback/fallback";
import Loading from "../fallback/loading";
import { formatTimeAgo } from "@/lib/time";
import GravitatePlanetButton from "./gravitate-planet-button";
import DeletePlanetButton from "./delete-planet-button";
import EditPlanetButton from "./edit-planet-button";

export default function PlanetItem({
  planetId,
  type,
}: {
  planetId: number;
  type: "LIST" | "DETAIL";
}) {
  const user = useUser();

  const {
    data: planet,
    error,
    isPending,
  } = usePlanetByIdQuery({ planetId, type });

  if (isPending) return <Loading />;
  if (error || !user) return <Fallback />;

  const isMine = user.id === planet.creatorId;

  return (
    <div
      className={`flex flex-col gap-4 pb-8 ${type === "LIST" && "border-b"} `}
    >
      <div className="flex justify-between">
        {/* 1. User Info */}
        <div className="flex items-start gap-4">
          <Link to={`profile/${planet.creatorId}`}>
            <img
              src={planet.creator.stargate?.avatarUrl || defaultAvatar}
              alt={`${planet.creator.stargate?.starname}'s Profile Image`}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <div>
            <div className="font-bold hover:underline">
              {planet.creator.stargate?.starname}
            </div>
            <div className="text-muted-foreground text-sm">
              {formatTimeAgo(planet.createdAt)}
            </div>
          </div>
        </div>

        {/* 1-2. edit/delete button */}
        <div className="text-muted-foreground flex gap-1 text-sm">
          {isMine && (
            <>
              <EditPlanetButton {...planet} />
              <DeletePlanetButton id={planet.id} />
            </>
          )}
        </div>
      </div>

      {/* 2. content, images */}
      <div className="flex cursor-pointer flex-col gap-5">
        {/* 2-1. content */}
        {type === "LIST" ? (
          <Link to={`/planet/${planet.id}`}>
            <div className="line-clamp-2 px-2 wrap-break-word whitespace-pre-wrap">
              {planet.content}
            </div>
          </Link>
        ) : (
          <div className="p-2 text-xl wrap-break-word whitespace-pre-wrap">
            {planet.content}
          </div>
        )}

        {/* 2-2. Image Container */}
        <Carousel>
          <CarouselContent>
            {planet.imageUrls?.map((url, index) => (
              <CarouselItem className={`basis-3/5`} key={index}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={url}
                    className="h-full max-h-[350px] w-full object-fill"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 3. Gravity(like), Moon(Comment) */}
      <div className="flex gap-3">
        <GravitatePlanetButton
          planetId={planet.id}
          gravityCount={planet.gravityCount}
          isGravityOn={planet.isGravityOn}
        />
        {/* 3-2. (Moon)Comment Button */}
        <Link
          to={`/planet/${planet.id}`}
          className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-1 px-3 text-xs"
        >
          <OrbitIcon className="h-4 w-4" />
          <span>{planet.moonCount} Moons</span>
        </Link>

        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-1 px-3 text-xs">
          <BinocularsIcon className="h-4 w-4" />
          <span>{planet.viewCount} Views</span>
        </div>
      </div>
    </div>
  );
}
