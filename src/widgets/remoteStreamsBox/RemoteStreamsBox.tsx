import '../styles/index.scss'
import { PeerConnection } from "../../entities";
import { SmallScreenBox } from "../smallScreenBox/SmallScreenBox";
import { glagol, streams } from "../../shared";
import { useState } from "react";
import { onListenerForRemoveTrack } from "../../features/handlers/handlersConference";

const peerConnection = new PeerConnection()

function RemoteStreamsBox() {
  const [ list, setList ] = useState<RTCRtpReceiver[]>([])

  function listenerAddTrack() {
    if (glagol.peerConnection!==null) {
      setList(glagol.peerConnection.pc.getRemoteStreams().slice(2))
    }



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
    if (glagol.peerConnection!==null) {
      setList(glagol.peerConnection.pc.getRemoteStreams())
      }
  }

  onListenerForRemoveTrack(cutListParticipiant)

  return <div>
    <SmallScreenBox list={list}/>
  </div>
}

export { RemoteStreamsBox }