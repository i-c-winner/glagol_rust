import { createBrowserRouter } from "react-router-dom";
import StartPage from "../APP/masterPage/StartPage";

const route=createBrowserRouter([
	{
		path: '/:room',
		element: <StartPage />
	},
	{
		path: '/',
		element: <StartPage />
	}
]
)

export default route