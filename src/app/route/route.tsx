import { createBrowserRouter } from "react-router-dom";
import { Main } from "../../pages";

const route=createBrowserRouter([
	{
		path: '/:room',
		element: <Main />
	},
	{
		path: '/',
		element: <Main />
	}
]
)

export default route