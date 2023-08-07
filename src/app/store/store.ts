import {configureStore} from "@reduxjs/toolkit";
import glagolSlice  from '../store/userSlice/glagolSlice'

export const store= configureStore({
  reducer: {
   glagolSlice
  }
})