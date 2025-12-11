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
      <div className="flex flex-row font-bold underline">
        Welcom to Starlog
        <div>
          <Button onClick={onClickButton}>Button!</Button>
        </div>
      </div>
    </>
  );
}

export default App;
