import { Streams } from "../types/index";

const streams: Streams = {
  localStreams: null,
  remoteStreams: [],
  setRemoteStream: function (stream) {
    this.remoteStreams.push(stream)
  },
  setLocalStreams: function (stream: MediaStream) {
    this.localStreams= stream
  },
  getRemoteStreams: function () {
    return this.remoteStreams
  },
  getLocalStreams: function () {
    return this.localStreams
  }
}

export {streams}