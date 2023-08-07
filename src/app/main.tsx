import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import route from "./route/route";
import { darkTheme } from "./themes/theme";
import { ThemeProvider } from "@mui/material";
import {store} from "./store/store";
import { Provider } from "react-redux";


// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <RouterProvider router={route}/>
    </Provider>
  </ThemeProvider>
)
