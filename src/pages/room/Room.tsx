import { useAsync } from "react-async";
import { useEffect } from "react";
import { BigScreen } from "../../widgets/BIgScreen/BigScreen";
import './index.scss'
import { streams } from "../../shared";
import {glagol} from "../../shared/glagol/glagol";

const getStreams = async () => {
  return await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  })
}

function Room() {
  // @ts-ignore
  const { Strophe } = window.global
  const { data, error, isPending } = useAsync({ promiseFn: getStreams })
  useEffect(() => {
    // @ts-ignore
    window.history.replaceState({}, '', glagol.user.roomName)
    // @ts-ignore
  }, [])

  if (error) {
    new Error('Error getMediaDevices')
    return <p>is Error</p>
  }
  if (isPending) return <p>...Pending</p>
  if (data) {
    streams.setLocalStreams(data)
    // @ts-ignore
    data.getTracks().forEach((track: MediaStreamTrack) => {
      // @ts-ignore
      glagol.peerConnection.pc.addTrack(track)
    })
    // @ts-ignore
    const { user, connection } = glagol
    const message = new Strophe.Builder('presence', {
      to: `${user.roomName}@conference.prosolen.net/${user.userNode}`,
    }).c('x', {
      xmlns: 'http://jabber.org/protocol/muc'
    })
    connection.send(message)
    return (
      <div className="room">
        <BigScreen ></BigScreen>
        <div id='video' ></div>
      </div>
    )
  }
  return <p>Default</p>
}

export default Room