import { Outlet } from "react-router";

export default function GlobalLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Outlet />
    </div>
  );
}
