
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
    })
    console.log(pc)
  },
  getPeerConnection:()=> {
    // @ts-ignore
    return window.glagol.peerConnection.pc
  }
}

export {descriptor}