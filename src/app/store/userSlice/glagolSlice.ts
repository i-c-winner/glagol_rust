import { createSlice } from "@reduxjs/toolkit";
import { GlagolSlice } from "../../types";

const initialState: GlagolSlice = {
  user: {
    userNode: '',
    roomName: '',
    displayName: '',
  },
  connection: '',
  localStreams: '',
  peerConnection: ''
}

export const glagolSlice = createSlice({
  name: 'glagol',
  initialState,
  reducers: {
    addUserNode: ((state: any, action) => {
      state.user.userNode = action.payload
    })
  }
})

export const { addUserNode } = glagolSlice.actions
export default  glagolSlice.reducer