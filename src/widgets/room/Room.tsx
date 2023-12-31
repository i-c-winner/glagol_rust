import { useAsync } from "react-async";
import { useEffect } from "react";
// import { createOffer } from "../model/room/room";
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
    window.history.replaceState({}, '', window.glagol.user.roomName)
    // @ts-ignore
  }, [])

  if (error) new Error('Error getMediaDevices')
  if (isPending) return <p>...Pending</p>
  if (data) {
    // @ts-ignore
    window.glagol.localStreams = data
    // @ts-ignore
    data.getTracks().forEach((track: MediaStreamTrack) => {
      // @ts-ignore
      window.glagol.peerConnection.pc.addTrack(track)
    })
    // @ts-ignore
    const { user, connection } = window.glagol
    const message = new Strophe.Builder('presence', {
      to: `${user.roomName}@conference.prosolen.net/${user.userNode}`,
    }).c('x', {
      xmlns: 'http://jabber.org/protocol/muc'
    })
    connection.send(message)
    return (
      <div className="">
        <p>{`userNode: ${user.userNode}`}</p>
        <p>{`roomName: ${user.roomName}`}</p>
        <p>{`displayName: ${user.displayName}`}</p>
        <p>{`password: ${user.password}`}</p>
        <div id='video' ></div>
      </div>
    )
  }
}

export default Room