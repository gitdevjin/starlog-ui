import { useStargateQuery } from "@/hooks/queries/use-stargate-query";

import defaultAvatar from "@/assets/default-avatar.jpg";
import Fallback from "../fallback/fallback";
import Loading from "../fallback/loading";
import EditStargateButton from "./edit-stargate-button";
import { useSession } from "@/hooks/queries/use-session";

export default function StargateInfo({ userId }: { userId: string }) {
  const { data: currentUser } = useSession();

  const {
    data: userWithStargate,
    error: fetchStargateError,
    isPending: isFetchingStargatePending,
  } = useStargateQuery(userId);

  const isMine = currentUser?.id === userId;

  if (isFetchingStargatePending) return <Loading />;
  if (fetchStargateError || !userWithStargate) return <Fallback />;

  return (
    <div className="mt-2 flex flex-col items-start justify-center gap-5">
      {/* Cover Image */}
      <div className="relative h-48 w-full bg-gray-200">
        <img
          src="/assets/planet.png"
          alt="Cover"
          className="h-full w-full object-cover"
        />

        {/* Profile Avatar */}
        <div className="absolute -bottom-16 left-6">
          <div className="border-background h-32 w-32 overflow-hidden rounded-full border-4 bg-gray-300">
            <img
              src={userWithStargate.stargate?.avatarUrl || defaultAvatar}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex h-12 w-full justify-end">
        {isMine && <EditStargateButton />}
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">
          {userWithStargate?.stargate?.starname}
        </div>
        <div className="text-muted-foreground">
          {userWithStargate?.stargate?.bio || "no bio"}
        </div>
        <div className="text-muted-foreground">
          {userWithStargate?.stargate?.firstName || "no first name "}
          {userWithStargate?.stargate?.lastName || "no last name"}
        </div>
      </div>
    </div>
  );
}
