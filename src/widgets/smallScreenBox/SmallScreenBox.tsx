import { SmallScreen } from "../smallscreen/SmallScreen";


function SmallScreenBox(props:  any) {
  console.log(props, 'SMALSCREE')
  return (
    <div>
      {props.list.map((stream: RTCRtpReceiver, index: number)=>{
        console.log(stream)
        return <SmallScreen  src={stream} key={index} />
      })}
    </div>
  )



}

export { SmallScreenBox }