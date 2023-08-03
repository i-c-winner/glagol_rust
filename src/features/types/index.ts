type Descriptor = {
  currentTransceiver: {
    audio: number,
    video: number
  },
  setRemoteDescription: (description: Params)=>void,
  getPeerConnection: ()=>RTCPeerConnection
}

type Params ={
  audio: number,
    video: number,
    description: string
}
export type {Descriptor, Params}