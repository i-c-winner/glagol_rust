import {Creator, Room} from "../../widgets";
import { StateComponents } from "../../widgets/creater/types/types";
import { useEffect, useState } from "react";

export default function Main() {
  const [state, setState]=  useState<StateComponents>('creatingDisplayName')
  function actionClick(value: string){
    if (state==='creatingDisplayName') {
      // @ts-ignore
      window.glagol.user.displayName=value
      setState('creatingRoom')
    } else {
      // @ts-ignore
      window.glagol.user.roomName=value
      setState('isRoom')
    }
  }

  useEffect(()=>{
    const url=window.location.pathname
    const roomName=url.split('/')[1]
    if (roomName) {
setState('creatingRoom')
    }
  },[])
  return (
    <div className="main">
    {(state==='creatingDisplayName'||state==='creatingRoom')? <Creator actionClick={actionClick}/>: null}
    {state==='isRoom'?<Room/>: null}
    </div>
  )
}
