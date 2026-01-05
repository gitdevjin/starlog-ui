import { useStargateQuery } from "@/hooks/queries/use-stargate-query";
import { useUser } from "@/store/user-store";
import defaultAvatar from "@/assets/default-avatar.jpg";
import Fallback from "../fallback/fallback";
import Loading from "../fallback/loading";

export default function StargateInfo({ userId }: { userId: string }) {
  const currentUser = useUser();
  if (!currentUser) throw new Error("User not fount");

  const {
    data: userWithStargate,
    error: fetchStargateError,
    isPending: isFetchingStargatePending,
  } = useStargateQuery(userId);

  const isMine = currentUser.id === userId;

  console.log(userWithStargate);

  if (fetchStargateError) return <Fallback />;
  if (isFetchingStargatePending) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img
        src={userWithStargate?.stargate?.avatarUrl || defaultAvatar}
        alt=""
        className="h-30 w-30 rounded-full object-cover"
      />
      <div className="flex flex-col items-center gap-3">
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
      {/* {isMine && <EditProfileButton />} */}
    </div>
  );
}
