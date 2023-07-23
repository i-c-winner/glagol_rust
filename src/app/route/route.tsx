import { createBrowserRouter } from "react-router-dom";
import App from "../APP/App";

const route=createBrowserRouter([
	{
		path: '/:room',
		element: <App />
	},
	{
		path: '/',
		element: <App />
	}
]
)

export default route