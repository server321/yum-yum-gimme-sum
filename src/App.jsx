import { RouterProvider } from "react-router-dom";
import { router } from "../packages/router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
