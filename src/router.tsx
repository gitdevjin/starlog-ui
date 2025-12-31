import { Route, Routes } from "react-router";
import GlobalLayout from "./components/layout/global-layout";
import IndexPage from "./pages/index-page";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import GuestOnlyLayout from "./components/layout/guest-only-layout";
import MemberOnlyLayout from "./components/layout/member-only-layout";
import PlanetDetailPage from "./pages/planet-detail-page";

export default function Router() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route element={<GuestOnlyLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        <Route element={<MemberOnlyLayout />}>
          <Route path={"/"} element={<IndexPage />} />
          <Route path="/planet/:planetId" element={<PlanetDetailPage />} />
          <Route path={"/temp"} element={<div>tempt</div>} />
          <Route path={"/about"} element={<div>about</div>} />
          <Route path={"/random"} element={<div>random</div>} />
        </Route>
      </Route>
    </Routes>
  );
}
