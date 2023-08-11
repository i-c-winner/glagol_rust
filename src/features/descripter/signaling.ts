import {glagol} from "../../shared/glagol/glagol";

function doSignaling (answer: string) {
  // @ts-ignore
  const {Strophe}= window.global
  // @ts-ignore
  const {user}=glagol
  // @ts-ignore
  const peerConnection=glagol.peerConnection.pc
  const message: any=new Strophe.Builder('message',{
    to: `${user.roomName}@conference.prosolen.net/focus`,
    type: 'chat'
  }).c('body').t(answer)
  // @ts-ignore
  glagol.connection.send(message)
  console.log(message, 'DOSIGNALING')
}

export {doSignaling}