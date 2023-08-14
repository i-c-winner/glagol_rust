import '../styles/index.scss'
import { PeerConnection } from "../../features";
import { SmallScreenBox } from "../smallScreenBox/SmallScreenBox";
import { streams } from "../../shared";
import { useState } from "react";
import { onListenerForRemoveTrack } from "../../features/handlers/handlersConference";

const peerConnection = new PeerConnection()

function RemoteStreamsBox() {
  const [ list, setList ] = useState<MediaStream[]>([])

  function listenerAddTrack() {
    setList(filteredStreams(streams.getRemoteStreams()))

    function filteredStreams(streams: any) {
      const honest = []
      for (let i = 1; i < streams.length; i += 2) {
        honest.push(streams[i])
      }
      return honest
    }
  }

  peerConnection.on(listenerAddTrack)

  function cutListParticipiant(jid: string) {
    console.log(list)
    console.log(jid)
  }

  onListenerForRemoveTrack(cutListParticipiant)

  return <div>
    <SmallScreenBox list={list}/>
  </div>
}

export { RemoteStreamsBox }