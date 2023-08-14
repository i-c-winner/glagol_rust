import { useEffect, useRef } from "react";

type Props = {
  src: any
}

function SmallScreen(props: Props) {
  console.log(props, 'SMALL')

  useEffect(() => {
    try {
    props.src.getTracks().forEach((track: MediaStreamTrack)=>{
console.log(track)
        if (track.kind==="video") {
          refVideo.current.srcObject = props.src
        }
      } )

    }catch (e) {

    }
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
