import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import route from "./route/route";
import { darkTheme } from "./themes/theme";
import { ThemeProvider } from "@mui/material";


// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={route}/>
    </ThemeProvider>
  </React.StrictMode>
)
