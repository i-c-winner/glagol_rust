type Descriptor = {
  currentTransceiver: {
    audio: number,
    video: number
  },
  candidates: RTCIceCandidate[],
  setCandidate: (candidate: RTCIceCandidate) =>void
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