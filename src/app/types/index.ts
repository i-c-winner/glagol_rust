type GlagolSlice = {
  user: {
    userNode: string,
    roomName: string,
    displayName: string
  },
  connection: string,
  peerConnection: string,
  localStreams: string
}
type  StreamsSlice = {
 remoteStreams: Set<string>
}

export type { GlagolSlice, StreamsSlice}