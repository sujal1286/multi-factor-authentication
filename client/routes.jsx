import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import Setup2FA from "../pages/Setup2FA.jsx";
import Home from "../pages/Home.jsx";
import Verify2FA from "../pages/Verify2FA.jsx";
import Error from "../pages/Error.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

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