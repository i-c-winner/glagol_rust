import { Creator, Room } from "../../../pages/index";
import { StateComponents } from "../../../pages/creater/types/types";
import { useEffect, useState } from "react";
import '../../styles/index.scss'
import {glagol} from "../../../shared/glagol/glagol";

export default function Main() {
  const [ state, setState ] = useState<StateComponents>('creatingRoom')

  function actionClick(value: string) {
    if (state === 'creatingRoom') {
      // @ts-ignore
      glagol.user.roomName = value
      setState('creatingDisplayName')
    } else {
      // @ts-ignore
      glagol.user.displayName = value
      setState('isRoom')
    }
  }
  useEffect(() => {
    const url = window.location.pathname
    const roomName = url.split('/')[1]
    if (roomName) {
      // @ts-ignore
      glagol.user.roomName=roomName
      setState('creatingDisplayName')
    }
  }, [])
  return (
    <div className="main">
      {(state === 'creatingDisplayName' || state === 'creatingRoom') ?
        <Creator state={state} actionClick={actionClick}/> : null}
      {state === 'isRoom' ? <Room /> : null}
    </div>
  )
}
