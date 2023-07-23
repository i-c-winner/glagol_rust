import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider } from "react-router-dom";
import route from "./app/route/route";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
<RouterProvider router={route}/>
  </React.StrictMode>,
)
