import { Link } from "react-router";
import logo from "@/assets/logo2.png";
import { SunIcon } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.jpg";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-15 border-b bg-background">
      <div className="m-auto flex h-full w-full max-w-200 justify-between px-4 items-center">
        <Link to={"/"} className="flex items-center gap-2">
          <img className="h-7 " src={logo} alt="Logo of StarLog" />
          <div className="bg-linear-to-r flex flex-col from-red-500 via-rose-400 to-rose-300 bg-clip-text text-lg font-bold text-transparent">
            StarLog
          </div>
        </Link>
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
