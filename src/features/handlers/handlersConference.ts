import { inviteRoom, validaterRoom } from "./createrMessage";
import { descriptor } from "../descripter/discripter";
import {Params} from "../types";

function handlersConference() {

  function handlerPresence(stanza: any) {
    // @ts-ignore
    const { Strophe } = window.global
    // @ts-ignore
    const { user } = window.glagol
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
    return true
  }

  function handlerIq(stanza: any) {
    // @ts-ignore
    const { user } = window.glagol
    const type = stanza.getAttribute('type')
    const to = stanza.getAttribute('to').split('@')[0]
    if (to === user.userNode) {
      if (type === 'result') {
        inviteRoom()
      }
      console.info(stanza, 'IQ')
      return true
    }
  }

  function handlerMessage(stanza: any) {
    // @ts-ignore
    const { Strophe } = window.global
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
      const peerConnection  = window.glagol.peerConnection.pc
        console.log(audio, video, jimbleText)
        const params: Params= {
          audio,
          video,
          description: jimbleText
        }
        descriptor.setRemoteDescription(params)


    } else if (bodyText==='ice_candidate') {
      // @ts-ignore
      console.log(window.glagol.peerConnection.pc.remoteDescription)
      console.log('ICE CANDIDATE')
    }
    console.info(stanza, 'message')
    return true
  }

// @ts-ignore
  const { connection } = window.glagol
  connection.addHandler(handlerPresence, '', 'presence')
  connection.addHandler(handlerIq, '', 'iq')
  // connection.addHandler(handlerAll, '', '')
  connection.addHandler(handlerMessage, '', 'message')

}

export { handlersConference }