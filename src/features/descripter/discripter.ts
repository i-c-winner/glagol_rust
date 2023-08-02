
import { Descripter } from "../types/type";
const descripter: Descripter ={
  setRemoteDescription: function (descripter){
  const pc = this.getPeerConnection()
    pc.setRemoteDescription(JSON.parse(atob(descripter)))
    console.log(pc)
  },
  getPeerConnection:()=> {
    // @ts-ignore
    return window.glagol.peerConnection.pc
  }
}

export {descripter}