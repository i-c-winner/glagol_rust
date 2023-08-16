import { SmallScreen } from "../smallscreen/SmallScreen";


function SmallScreenBox(props:  any) {
  return (
    <div>
      {props.list.map((stream: RTCRtpReceiver, index: number)=>{
          return <SmallScreen  src={stream} key={index} />
      })}
    </div>
  )



}

export { SmallScreenBox }