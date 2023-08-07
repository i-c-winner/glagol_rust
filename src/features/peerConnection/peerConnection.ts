import { config } from "../../shared";
import { doSignaling } from "../descripter/signaling";

class PeerConnection {
  private pc: RTCPeerConnection;

  constructor() {
    this.pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: config.peerServer
        }
      ]
    })
  }

  createHandlers() {
    this.pc.onicecandidate = (event) => {

      // @ts-ignore
      const { user } = window.glagol
      // @ts-ignore
      const { Strophe } = window.global

      if (event.candidate) {
        console.warn(event.candidate)
        if (event.candidate) {
          const candidate64 = btoa(JSON.stringify({
            candidate: event.candidate
          }))
          doSignaling(candidate64)
        }
      }
    }
    this.pc.ontrack = (event) => {

      console.log('%c addTrack', 'color: red; font-size: 25px', event)
      console.log(event.streams[0])
      const box= document.getElementById('video')
      const video= document.createElement('video')
      video.setAttribute('autoplay', 'true')
      if (box!==null) {
        box.appendChild(video)
        if (event.track.kind==='video') video.srcObject=event.streams[0]
      }
    }
    // this.pc.oniceconnectionstatechange = (event: any) => {
    //   console.log(event, 'EVENT')
    // }
  }

}

export {
  PeerConnection
}