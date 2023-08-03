type Descriptor = {
  currentTransceiver: {
    audio: number,
    video: number
  },
  setRemoteDescription: (description: Params)=>void,
  getPeerConnection: ()=>RTCPeerConnection,
  addTransceivers: (audio: number, video: number) => void,
  createAnswer: ()=>void
}

type Params ={
  audio: number,
    video: number,
    description: string
}
export type {Descriptor, Params}