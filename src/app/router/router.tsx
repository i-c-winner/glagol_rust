import { createBrowserRouter } from "react-router-dom";
import StartPage from "../APP/masterPage/StartPage";

const router = createBrowserRouter([
    {
      path: '/',
      element: <StartPage />
    },
    {
      path: '/:room',
      element: <StartPage />
    },
  ]
)

export default router