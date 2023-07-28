import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import route from "./route/route";
import { Main } from "../pages";
import { darkTheme } from "./themes/theme";
import { ThemeProvider } from "@mui/material";


// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={route}>
      <ThemeProvider theme={darkTheme}>
        <Main />
      </ThemeProvider>
  </RouterProvider>
</React.StrictMode>
)
