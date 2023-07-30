import { useAsync } from "react-async";
import {createOffer} from "../model/room/room";

const getStreams = async () => {
  return await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  })
}

function Room() {

  const { data, error, isPending } = useAsync({ promiseFn: getStreams })
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