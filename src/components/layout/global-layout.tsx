import { Outlet } from "react-router";
import Header from "./header/header";
import Footer from "../footer";

export default function GlobalLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="m-auto w-full max-w-200 flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
