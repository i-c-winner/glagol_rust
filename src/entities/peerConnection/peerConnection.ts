import { config } from "../../shared";
import { doSignaling } from "../../features/descripter/signaling";
import { streams } from "../../shared";
import { glagol } from "../../shared";
import { Params } from "../../features/types";

class PeerConnection {
  pc: RTCPeerConnection;
  private static instance: any;
  private addTrackToList: any;
  private candidates: RTCIceCandidate[];
  private currentTransceivers: { audio: number; video: number };

  constructor() {
    if (!PeerConnection.instance) {
      PeerConnection.instance = this
    }
    this.pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: config.peerServer
        }
      ]
    })
    this.addTrackToList = null
    this.candidates=[]
    this.currentTransceivers={
      audio: 0,
      video: 0
    }
    return PeerConnection.instance
  }

  createHandlers() {
    this.pc.onicecandidate = (event) => {
      // @ts-ignore
      const { user } = glagol
      // @ts-ignore
      const { Strophe } = window

      if (event.candidate) {
        if (event.candidate) {
          const candidate64 = btoa(JSON.stringify({
            candidate: event.candidate
          }))
          doSignaling(candidate64)
        }
      }
    }
    this.pc.ontrack = (event) => {
      console.log(glagol.peerConnection?.pc.getReceivers())
      streams.setRemoteStream(event.streams[0])
      this.addTrackToList()
    }
    this.pc.removeTrack=(event)=> {

    }
  }
removeTrack(sender: RTCRtpSender) {
    this.pc.removeTrack(sender)
}

  setRemoteDescription (params: Params) {
  this.addTransceivers(params.audio, params.video)
  this.pc.setRemoteDescription(JSON.parse(atob(params.description))).then(() => {
  while (this.candidates.length > 0) {
  const candidate = this.candidates.shift()
  this.pc.addIceCandidate(candidate)
}
})
this.createAnswer()
}
  addTransceivers(audio: number, video: number) {
  this.currentTransceivers.audio = this.currentTransceivers.audio + audio
  this.currentTransceivers.video = this.currentTransceivers.video + video
  // @ts-ignore
  const peerConnection = glagol.peerConnection.pc
  // @ts-ignore
  const connection = glagol.connection

  do {
  peerConnection.addTransceiver('audio', { direction: 'recvonly' })
this.currentTransceivers.audio -= 1
} while (this.currentTransceivers.audio > 0)
  do {
    peerConnection.addTransceiver('audio', {
      direction: 'recvonly'
    })
    this.currentTransceivers.video -= 1
  } while (this.currentTransceivers.video > 0)
}
  createAnswer() {
    this.pc.createAnswer().then((answer: any) => {
      this.pc.setLocalDescription(answer)
      return btoa(JSON.stringify({ answer }))
    })
  }

  on(addTrackToList: any) {
    this.addTrackToList = addTrackToList
  }
}

export {
  PeerConnection
}