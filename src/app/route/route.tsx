import { createBrowserRouter } from "react-router-dom";
import MasterPage from "../APP/masterPage/MasterPage";

const route=createBrowserRouter([
	{
		path: '/:room',
		element: <MasterPage />
	},
	{
		path: '/',
		element: <MasterPage />
	}
]
)

export default route