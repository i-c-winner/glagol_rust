import { SmallScreen } from "../smallscreen/SmallScreen";


function SmallScreenBox(props:  any) {

console.log(props)
  return (
    <div>
      {props.list.slice(1).map((stream: MediaStream, index: number)=>{
        return <SmallScreen  src={stream} key={index} />
      })}
    </div>
  )



}

export { SmallScreenBox }