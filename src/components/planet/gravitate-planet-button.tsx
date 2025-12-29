import useTogglePlanetGravity from "@/hooks/mutations/planet/use-toggle-planet-gravity";

import { AppleIcon, HeartIcon } from "lucide-react";
import { toast } from "sonner";

export default function GravitatePlanetButton({
  planetId,
  gravityCount,
  isGravityOn,
}: {
  planetId: number;
  gravityCount: number;
  isGravityOn: boolean;
}) {
  const { mutate: togglePlanetGravity } = useTogglePlanetGravity({
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
      });
    },
  });

  const handleGravity = () => {
    togglePlanetGravity(planetId);
  };

  return (
    <div
      onClick={handleGravity}
      className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm"
    >
      <AppleIcon
        className={`h-4 w-4 ${isGravityOn && "fill-foreground border-foreground"}`}
      />
      <span>{gravityCount} Gravity</span>
    </div>
  );
}
