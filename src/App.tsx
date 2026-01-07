import Router from "./router";
import ModalProvider from "./provider/modal-provider";
import SessionProvider from "./provider/session-provider";

function App() {
  return (
    <>
      <SessionProvider>
        <ModalProvider>
          <Router />
        </ModalProvider>
      </SessionProvider>
    </>
  );
}

export default App;
