import { useAsync } from "react-async";
import { createOffer } from "../model/room/room";
import { useEffect } from "react";

const getStreams = async () => {
  return await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  })
}

function Room() {
  const { data, error, isPending } = useAsync({ promiseFn: getStreams })
  useEffect(() => {
    // @ts-ignore
    const { $build, Strophe } = window.global
    // @ts-ignore
    const { user, connection } = window.glagol
    //
    // <presence to='firstRoom@conference.prosolen.net/user2345'>
    //   <x xmlns='http://jabber.org/protocol/muc'/>
    //   </presence>
    console.log(connection)
    const message = new Strophe.Builder('presence', {
      to: `${user.roomName}@conference.prosolen.net/${user.userNode}`,
      // from:  `${user.displayName}@prosolen.net/${user.userNode}`
    }).c('x', {
      xmlns: 'http://jabber.org/protocol/muc'
    })
      console.log('send room')
    console.log(message)
      connection.send(message)
  }, [])

  if (error) new Error('Error getMediaDevices')
  if (isPending) return <p>...Pending</p>
  if (data) {
    const streams = data
    // @ts-ignore
    window.glagol.localStreams = streams
    streams.getTracks().forEach((track) => {
      // @ts-ignore
      window.glagol.peerConnection.pc.addTrack(track)
    })
    createOffer()
    return (
      <div className="">Room</div>
    )
  }
}

export default Room