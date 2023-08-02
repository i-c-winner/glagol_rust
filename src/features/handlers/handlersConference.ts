import { inviteRoom, validaterRoom } from "./createrMessage";
import { descripter } from "../descripter/discripter";

function handlersConference() {

  function handlerPresence(stanza: any) {
    // @ts-ignore
    const { Strophe } = window.global
    // @ts-ignore
    const { user } = window.glagol
    const to = stanza.getAttribute('to').split('@')[0]
    const xAttributes = stanza.getElementsByTagName('x')
    if (to === user.userNode) {
      const statuses = xAttributes[1].getElementsByTagName('status')
      Array.from(statuses).forEach((status: any) => {
        if (Number(status.getAttribute('code')) === 201) {
          validaterRoom()
        }
        if (Number(status.getAttribute('code')) === 101) {
          inviteRoom()
        }
      })
    }
    console.info(stanza, 'Stanza')
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
    const jimbleText = Strophe.getText(jimble[0])
    const audio = stanza.getAttribute('audio')
    const video = stanza.getAttribute('video')
    if (bodyText === 'add_track') {
      console.log(audio, video, jimbleText)
      descripter.setRemoteDescription(jimbleText)
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