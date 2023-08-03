
import { Descriptor} from "../types";
const descriptor: Descriptor ={
  currentTransceiver: {
    audio: 0,
    video: 0
  },
  setRemoteDescription: function (params){
  const pc = this.getPeerConnection()
    pc.setRemoteDescription(JSON.parse(atob(params.description))).then(()=>{
console.log(params)
      this.addTransceivers(params.audio, params.video)
    })
    console.log(pc)
  },
  getPeerConnection:()=> {
    // @ts-ignore
    return window.glagol.peerConnection.pc
  },
  addTransceivers: function (audio, video) {
    // @ts-ignore
    const peerConnection= window.glagol.peerConnection.pc
    const trancicviers: RTCRtpTransceiver[] = peerConnection.getTransceivers()
    console.log(trancicviers)
    const audioTranciver: RTCRtpTransceiver[]= []
    const videoTranciver: RTCRtpTransceiver[]= []
    trancicviers.forEach((transceiver)=>{
      if (transceiver.receiver.track.kind==='video') {
        videoTranciver.push(transceiver)
      } else if (transceiver.receiver.track.kind==='audio') {
        audioTranciver.push(transceiver)
      }
    })
    console.log('audio', audioTranciver)
    console.log('video', videoTranciver)
    const delta= {
      audio: audioTranciver.length-this.currentTransceiver.audio+Number(audio),
      video: videoTranciver.length-this.currentTransceiver.video+Number(video)
    }
    if (delta.video<0) {
      for (let i=0; i<=(Math.abs(delta.video)); i++) {
        peerConnection.addTransceiver('video', {
          direction: 'recvonly'
        })
      }
    }
    if (delta.audio<0) {
      for (let i=0; i<=(Math.abs(delta.audio)); i++) {
        peerConnection.addTransceiver('audio', {
          direction: 'recvonly'
        })
      }
    }
    console.log(peerConnection.getTransceivers())
  }
}

export {descriptor}