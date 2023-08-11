import { useEffect, useRef } from "react";

type Props = {
  src: any
}

function SmallScreen(props: Props) {
  useEffect(() => {
    props.src.getTracks().forEach((track: MediaStreamTrack)=>{
      if (track.kind==="video") {
        refVideo.current.srcObject = props.src
      }
    })

  },[])


  // @ts-ignore
  const refVideo = useRef<any>()
  return <div className="small-screen">
    <video
      ref={refVideo}
      className="small-screen__video"
      autoPlay
    >
    </video>
  </div>

}

export { SmallScreen }
