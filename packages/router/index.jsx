import { createBrowserRouter } from "react-router-dom";
import Menu from "../pages/menu";

import Order from "../pages/order";
import Eta from "../pages/eta";
import Receipt from "../pages/receipt";

const router = createBrowserRouter([
  { path: "/", element: <Menu /> },
  { path: "/order", element: <Order /> },
  { path: "/eta", element: <Eta /> },
  { path: "/receipt", element: <Receipt /> },

  {
    path: "*",
    element: <h1>Error 404. This is not the page you are looking for.</h1>,
  },
]);

export { router };
