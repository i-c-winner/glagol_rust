import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { darkTheme } from "./themes/theme";
import { ThemeProvider } from "@mui/material";


console.log(56)
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router}/>
  </ThemeProvider>
)