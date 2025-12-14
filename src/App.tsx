import { toast } from "sonner";
import { Button } from "./components/ui/button";
import Router from "./router";
import ModalProvider from "./provider/modal-provider";

function App() {
  return (
    <>
      <ModalProvider>
        <Router />
      </ModalProvider>
    </>
  );
}

export default App;
