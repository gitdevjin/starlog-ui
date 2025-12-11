import { Route, Routes } from "react-router";
import GlobalLayout from "./components/layout/global-layout";
import IndexPage from "./pages/index-page";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";

export default function Router() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path={"/"} element={<IndexPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path={"/temp"} element={<div>tempt</div>} />
        <Route path={"/about"} element={<div>about</div>} />
        <Route path={"/random"} element={<div>random</div>} />
      </Route>
    </Routes>
  );
}
