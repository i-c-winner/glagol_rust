import { Descriptor } from "../types";
import { doSignaling } from "./signaling";
import {glagol} from "../../shared/glagol/glagol";

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
    return glagol.peerConnection.pc
  },
  addTransceivers: function (audio, video) {
    this.currentTransceiver.audio = this.currentTransceiver.audio + audio
    this.currentTransceiver.video = this.currentTransceiver.video = video
    // @ts-ignore
    const peerConnection = glagol.peerConnection.pc
    // @ts-ignore
    const connection = glagol.connection

    do {
      peerConnection.addTransceiver('audio', { direction: 'recvonly' })
      this.currentTransceiver.audio -= 1
    } while (this.currentTransceiver.audio > 0)
    do {
      peerConnection.addTransceiver('audio', {
        direction: 'recvonly'
      })
      this.currentTransceiver.video -= 1
    } while (this.currentTransceiver.video > 0)
  },
  createAnswer: function () {
    const peerConnection = this.getPeerConnection()
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