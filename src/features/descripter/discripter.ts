import { Descriptor } from "../types";
import { doSignaling } from "./signaling";

const descriptor: Descriptor = {
  currentTransceiver: {
    audio: 0,
    video: 0
  },
  candidates: [],
  setCandidate: function (candidate: RTCIceCandidate) {
    this.candidates.push(candidate)
  },

  setRemoteDescription: function (params) {
    const pc = this.getPeerConnection()
    this.addTransceivers(params.audio, params.video)
   pc.setRemoteDescription(JSON.parse(atob(params.description))).then(() => {
      while (this.candidates.length > 0) {
        const candidate = this.candidates.shift()
        pc.addIceCandidate(candidate)
      }
    })
    this.createAnswer()
  },
  getPeerConnection: () => {
    // @ts-ignore
    return window.glagol.peerConnection.pc
  },
  addTransceivers: function (audio, video) {
    this.currentTransceiver.audio=this.currentTransceiver.audio+audio
    this.currentTransceiver.video=this.currentTransceiver.video=video
    // @ts-ignore
    const peerConnection = window.glagol.peerConnection.pc
    // @ts-ignore
    const connection = window.glagol.connection
    // const currentTrancicviers: RTCRtpTransceiver[] = peerConnection.getTransceivers()

    do {
      peerConnection.addTransceiver('audio', { direction: 'recvonly' })
      this.currentTransceiver.audio-=1
    } while (this.currentTransceiver.audio>0)
   do {
     peerConnection.addTransceiver('video', {
       direction: 'recvonly'
     })
     this.currentTransceiver.video-=1
   } while (this.currentTransceiver.video>0)

    // this.createAnswer()
  },
  createAnswer: function () {
    const peerConnection = this.getPeerConnection()
    // peerConnection.onsignalingstatechange((state: any)=>{
    //   console.log(state)
    // })
      peerConnection.createAnswer({
      iceRestart: true
    }).then((answer: any) => {
      peerConnection.setLocalDescription(answer)
        const answer64 = btoa(JSON.stringify({ answer }))
      doSignaling(answer64)
    })
  }
}

export { descriptor }