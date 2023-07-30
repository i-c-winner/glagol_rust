import { config } from "../../shared";

class PeerConnection {
  private pc: RTCPeerConnection;
  constructor() {
   this.pc= new RTCPeerConnection({
      iceServers: [
        {
          urls: config.peerServer
        }
      ]
    })
  }
   createHandlers(){
    this.pc.onicecandidate= (event)=>{
      console.log(event, 'iceCandidate')
      if (event.candidate) {
        // @ts-ignore
        window.glagol.connection.send(btoa(JSON.stringify({
          candidate: event.candidate
        })))
      }
    }
    this.pc.ontrack=(event)=>{
      console.log(event, 'addTrack')
    }
   }

  onAddTrack (event:RTCTrackEvent){
    console.log(event, 'ontrack')
  }

}


export { PeerConnection }