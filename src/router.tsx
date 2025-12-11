import { Route, Routes } from "react-router";

export default function Router() {
  return (
    <Routes>
      <Route path={"/"} element={<div>home</div>} />
      <Route path={"/temp"} element={<div>tempt</div>} />
      <Route path={"/about"} element={<div>about</div>} />
      <Route path={"/random"} element={<div>random</div>} />
    </Routes>
  );
}
