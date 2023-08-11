import { useEffect, useRef } from "react";
import '../styles/index.scss'
import { streams } from "../../shared"
import { RemoteStreamsBox } from "../remoteStreamsBox/RemoteStreamsBox";
function BigScreen() {
  const refBigScreen=useRef<any>()
  useEffect(()=>{
    const localStreams=streams.getLocalStreams()
    refBigScreen.current.srcObject=localStreams
  },[])
  return (
    <div className='bigscreen' >
      <video className='video-box' ref={refBigScreen} autoPlay={true} ></video>
      <RemoteStreamsBox />
    </div>

  )
}

export { BigScreen }