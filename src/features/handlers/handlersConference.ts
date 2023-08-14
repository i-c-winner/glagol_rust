import { inviteRoom, validaterRoom } from "./createrMessage";
import { descriptor } from "../descripter/discripter";
import {Params} from "../types";
import {glagol} from "../../shared";
let removeTrackFromList: any = null
function handlersConference() {
  function handlerPresence(stanza: any) {
    // @ts-ignore
    const  Strophe  = window.Strophe
    // @ts-ignore
    const { user } = glagol
    const xAttributes = stanza.getElementsByTagName('x')
    const from: any =stanza.getAttribute('from')
    const fromSource=Strophe.getResourceFromJid(from)

    if (fromSource === user.userNode) {
      const statuses: any[] = xAttributes[1].getElementsByTagName('status')
      if (Number(Array.from(statuses)[0].getAttribute('code'))===201){
        validaterRoom()
      } else if (Number(Array.from(statuses)[0].getAttribute('code'))===100){
        inviteRoom()
      }
    }
    
    try{
      const item=xAttributes[0].getElementsByTagName('item')
      const role =item[0].getAttribute('role')
      if (role==='none') {
        const jid=item[0].getAttribute('jid').split('/')[1]
        removeTrackFromList(jid)
      }
    } catch (e) {
      
    }
   
    console.log(stanza, 'Presence')
    return true
  }

  function handlerIq(stanza: any) {
    // @ts-ignore
    const { user } = glagol
    const type = stanza.getAttribute('type')
    const to = stanza.getAttribute('to').split('@')[0]
    if (to === user.userNode) {
      if (type === 'result') {
        inviteRoom()
      }
      return true
    }
  }

  function handlerMessage(stanza: any) {
    // @ts-ignore
    const { Strophe } = window
    const body = stanza.getElementsByTagName('body')[0]
    const bodyText = Strophe.getText(body)
    const jimble = stanza.getElementsByTagName('jimble')
    const jimbleText: string = Strophe.getText(jimble[0])
    let audio= 0
    let video=0
   try {
     audio = jimble[0].getAttribute('audio')
     video = jimble[0].getAttribute('video')
   } catch (e) {

   }

    if (bodyText === 'add_track') {
      // @ts-ignore
      const peerConnection  = glagol.peerConnection.pc
        const params: Params= {
          audio,
          video,
          description: jimbleText
        }
        descriptor.setRemoteDescription(params)
    } else if (bodyText==='ice_candidate') {
      // @ts-ignore
      const peerConnection  = glagol.peerConnection.pc
      const jimbleMessage=JSON.parse(atob(jimbleText))
      const icecandidate= new RTCIceCandidate(jimbleMessage)
      if (peerConnection.remoteDescription) {
        peerConnection.addIceCandidate(icecandidate)
      } else {
        descriptor.setCandidate(icecandidate)
      }
    }
    if (bodyText==="remove_track") {
     const params: Params ={
       audio: audio*(-1),
       video: video*(-1),
       description: jimbleText
     }
     descriptor.setRemoteDescription(params)

    }
    return true
  }

// @ts-ignore
  const { connection } = glagol
  connection.addHandler(handlerPresence, '', 'presence')
  connection.addHandler(handlerIq, '', 'iq')
  // connection.addHandler(handlerAll, '', '')
  connection.addHandler(handlerMessage, '', 'message')

}
function onListenerForRemoveTrack(remoteAddStrem:any) {
  removeTrackFromList = remoteAddStrem
}

export { handlersConference, onListenerForRemoveTrack }