import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./src/pages/LoginPage.jsx";
import Setup2FA from "./src/pages/Setup2FA.jsx";
import Home from "./src/pages/Home.jsx";
import Verify2FA from "./src/pages/Verify2FA.jsx";
import Error from "./src/pages/Error.jsx";
import ProtectedRoute from "./src/components/ProtectedRoute.jsx";

const router = createBrowserRouter([
 {
    path: "/login",
    element: <LoginPage />,
    errorelement: <Error />
 },
 {
      element: <ProtectedRoute />,
      children: [{
         path: "/",
         element: <Home />,
         errorelement: <Error />
      },
      {
         path: "/setup-2fa",
         element: <Setup2FA />,
         errorelement: <Error />
      },
      {
         path: "/verify-2fa",
         element: <Verify2FA />,
         errorelement: <Error />
      },
      {
         path: "/login",
         element: <LoginPage />,
         errorelement: <Error />
      }],
   },
 
]);

export default router;                             