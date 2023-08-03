import { Creator, Room } from "../../widgets";
import { StateComponents } from "../../widgets/creater/types/types";
import { useEffect, useState } from "react";

export default function Main() {
  const [ state, setState ] = useState<StateComponents>('creatingRoom')

  function actionClick(value: string) {
    if (state === 'creatingRoom') {
      // @ts-ignore
      window.glagol.user.roomName = value
      setState('creatingDisplayName')
    } else {
      // @ts-ignore
      window.glagol.user.displayName = value
      setState('isRoom')
    }
  }
  useEffect(() => {
    const url = window.location.pathname
    const roomName = url.split('/')[1]
    if (roomName) {
      // @ts-ignore
      window.glagol.user.roomName=roomName
      setState('creatingDisplayName')
    }
  }, [])
  return (
    <div className="main">
      <p>{state}</p>
      {(state === 'creatingDisplayName' || state === 'creatingRoom') ?
        <Creator state={state} actionClick={actionClick}/> : null}
      {state === 'isRoom' ? <Room/> : null}
    </div>
  )
}
