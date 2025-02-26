import { createBrowserRouter } from "react-router-dom";

// import { Menu } from "@yumApp/menu";
import Menu from "../../../../packages/pages/menu";
import Order from "../../../../packages/pages/order";
import Eta from "../../../../packages/pages/eta";
import Receipt from "../../../../packages/pages/receipt";

const router = createBrowserRouter([
  { path: "/", element: <Menu /> },
  { path: "/order", element: <Order /> },
  { path: "/eta", element: <Eta /> },
  { path: "/receipt", element: <Receipt /> },

  { path: "*", element: <h1>Error 404. This is not the page you are looking for.</h1> },
]);

export { router };