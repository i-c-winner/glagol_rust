import {Creator, Room} from "../../widgets";
import { StateComponents } from "../../widgets/creater/types/types";
import { useEffect, useState } from "react";

export default function Main() {
  const [state, setState]=  useState<StateComponents>('creatingDisplayName')
  function actionClick(){
    if (state==='creatingDisplayName') {
      setState('creatingRoom')
    } else {
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
    {(state==='creatingDisplayName'||state==='creatingRoom')? <Creator state={state} actionClick={actionClick}/>: null}
    {state==='isRoom'?<Room/>: null}
    </div>
  )
}
