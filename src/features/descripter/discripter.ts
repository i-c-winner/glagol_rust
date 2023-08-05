
import { Descriptor} from "../types";
import { doSignaling } from "./signaling";
const descriptor: Descriptor ={
  currentTransceiver: {
    audio: 1,
    video: 1
  },
  candidates : [],
  setCandidate: function (candidate: RTCIceCandidate){
    this.candidates.push(candidate)
},

  setRemoteDescription: function (params){
  const pc = this.getPeerConnection()
    this.addTransceivers(params.audio, params.video)
    pc.setRemoteDescription(JSON.parse(atob(params.description))).then(()=>{

     while (this.candidates.length>0) {
       const candidate=this.candidates.shift()
       pc.addIceCandidate(candidate)
     }
     //  this.createAnswer()
    })
  },
  getPeerConnection:()=> {
    // @ts-ignore
    return window.glagol.peerConnection.pc
  },
  addTransceivers: function (audio, video) {
    // @ts-ignore
    const peerConnection= window.glagol.peerConnection.pc
    const trancicviers: RTCRtpTransceiver[] = peerConnection.getTransceivers()
    const audioTranciver: RTCRtpTransceiver[]= []
    const videoTranciver: RTCRtpTransceiver[]= []




    trancicviers.forEach((transceiver)=>{
      if (transceiver.receiver.track.kind==='video') {
        videoTranciver.push(transceiver)
      } else if (transceiver.receiver.track.kind==='audio') {
        audioTranciver.push(transceiver)
      }
    })
    const delta= {
      audio: audioTranciver.length-this.currentTransceiver.audio+Number(audio),
      video: videoTranciver.length-this.currentTransceiver.video+Number(video)
    }
    if (delta.video<0) {
      for (let i=0; i<(Math.abs(delta.video)); i++) {
        this.currentTransceiver.video+=1
        peerConnection.addTransceiver('video', {
          direction: 'recvonly'
        })
      }
    }
    if (delta.audio<0) {
      this.currentTransceiver.audio+=1
      for (let i=0; i<(Math.abs(delta.audio)); i++) {
        peerConnection.addTransceiver('audio', {
          direction: 'recvonly'
        })
      }
    }
    console.log(peerConnection.getTransceivers())
  },
  createAnswer: function (){
    const peerConnection= this.getPeerConnection()
    peerConnection.createAnswer({
      iceRestart: false
    }).then((answer: any)=>{
      peerConnection.setLocalDescription(answer)
      const answer64=btoa(JSON.stringify({answer}))
      doSignaling(answer64)
    })
  }
}

export {descriptor}