import { config } from "../../shared";
import { doSignaling } from "../descripter/signaling";
import { streams } from "../../shared";
import { glagol } from "../../shared";

class PeerConnection {
  pc: RTCPeerConnection;
  private static instance: any;
  private addTrackToList: any;

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
      console.log(event)
      streams.setRemoteStream(event.streams[0])
      this.addTrackToList()
    }
  }

  on(addTrackToList: any) {
    this.addTrackToList = addTrackToList
  }
}

export {
  PeerConnection
}