import { config } from "../../shared";

interface PeerConnect {
  pc: RTCPeerConnection,
  addHandlers: ()=>void,
  listeners: {
    [name: string]:((args: any[])=>void)[]
  },
  on: (name: string, callback: ()=>void)=>void,
  emit: (name: string, args: any[])=>void
}
const peerConnection: PeerConnect= {
  listeners: {},
  pc: new RTCPeerConnection({
    iceServers: [
      {
        urls: config.peerServer
      }
    ]
  }),
  addHandlers: function (){
    this.pc.ontrack=(event: any) =>{
      console.log(event, 'onTrack')
    }
    this.pc.onicecandidate=(event: any)=>{
      if (event.candidate) {
        // const candidate64=btoa(JSON.stringify({candidate: event.candidate}))
      }
      console.log(event, 'onicecandidate')
    }
  },
  on: function (name, callback) {
    if (!this.listeners[name]) {
      this.listeners[name]=[]
    } this.listeners[name].push(callback)
  },
  emit: function (name, args) {
    if (!this.listeners[name]) {
      console.info(`listeners: ${name} dont installed`)
    } else {
      this.listeners[name].forEach((listener)=>{
        listener(args)
      })
    }
  }
}
peerConnection.addHandlers()
export {peerConnection}