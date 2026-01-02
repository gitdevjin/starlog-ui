import { Link } from "react-router";
import { SunIcon } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 h-15 border-b">
      <div className="m-auto flex h-full w-full max-w-200 items-center justify-between">
        <div className="flex gap-2">
          <SidebarTrigger className="animation-duration-[7s] animate-pulse" />
          {/* <img
            className="animation-duration-[7s] h-7 animate-pulse"
            src={logo}
            alt="Logo of StarLog"
          /> */}
          <Link
            to={"/"}
            className="flex flex-col bg-linear-to-r from-red-500 via-rose-400 to-rose-300 bg-clip-text text-lg font-bold text-transparent"
          >
            StarLog
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <div className="hover:bg-muted cursor-pointer rounded-full p-2">
            <SunIcon />
          </div>
          <div>
            <img
              className="h-6 w-6 cursor-pointer rounded-full object-cover"
              src={defaultAvatar}
              alt=""
            />
          </div>
        </div>
      </div>
    </header>
  );
}
