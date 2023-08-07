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
      debugger
      state.user.userNode = action.payload
    }),
    addRoomName: ((state: GlagolSlice, action) => {
      state.user.roomName = action.payload
    }),
    addDisplayName: ((state: GlagolSlice, action) => {
      state.user.displayName = action.payload
    }),
    addConnection: ((state: GlagolSlice, action) => {
      state.connection = action.payload
    }),
    addLocalStreams: ((state: GlagolSlice, action) => {
      state.localStreams = action.payload
    }),
    addPeerConnection: ((state: GlagolSlice, action) => {
      state.peerConnection = action.payload
    })
  }
})

export const {
  addUserNode,
  addConnection,
  addPeerConnection,
  addLocalStreams,
  addRoomName,
  addDisplayName
} = glagolSlice.actions
export default glagolSlice.reducer