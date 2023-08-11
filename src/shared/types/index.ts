import { PeerConnection } from "../../features";

type   Streams ={
  localStreams: MediaStream|null,
  remoteStreams: MediaStream[],
  setRemoteStream: (stream: MediaStream)=>void
  getRemoteStreams: ()=>MediaStream[],
  getLocalStreams: () =>MediaStream|null,
  setLocalStreams: (stream: MediaStream)=> void
}
type Glagol ={
  connection: any,
  peerConnection: PeerConnection|null,
  user: {
    userNode: string,
    roomName: string,
    displayName: string
  }
}
export  type {Streams, Glagol}