import { Outlet } from "react-router";
import Header from "./header/header";

export default function GlobalLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Outlet />
    </div>
  );
}
