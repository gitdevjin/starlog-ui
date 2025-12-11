import { toast } from "sonner";
import { Button } from "./components/ui/button";
import Router from "./router";

function App() {
  const onClickButton = () => {
    toast.info("Button Clicked", {
      position: "top-center",
    });
  };
  return (
    <>
      <Router />
    </>
  );
}

export default App;
