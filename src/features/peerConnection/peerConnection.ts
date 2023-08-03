import { config } from "../../shared";

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
      const candidate = btoa(JSON.stringify({ candidate: event.candidate }))
      if (event.candidate) {
        const candidate64 =btoa(JSON.stringify({
          candidate: event.candidate
        }))
        if (candidate) {
          // @ts-ignore
          const { user } = window.glagol
          // @ts-ignore
          const { Strophe } = window.global

          const message = new Strophe.Builder('message', {
              to: `${user.roomName}@conference.prosolen.net/focus`,
              type: 'chat'
            }
          ).c('body').t(candidate64)
          // @ts-ignore
          // @ts-ignore
          window.glagol.connection.send(message)
        } else {
          console.log('candidateB64 is empty');
        }
      }
    }
    this.pc.ontrack = (event) => {
      console.log(event, 'addTrack')
    }
  }
}

export { PeerConnection }