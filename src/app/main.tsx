import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { darkTheme } from "./themes/theme";
import { ThemeProvider } from "@mui/material";

if (document.getElementById('root')) {
  // @ts-ignore
  ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}
