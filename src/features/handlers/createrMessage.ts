import {glagol} from "../../shared/glagol/glagol";

function validaterRoom() {
  // @ts-ignore
  const { user } = glagol
// @ts-ignore
  const { Strophe } = window.global
  const message = new Strophe.Builder('iq', {
    from: `${user.roomName}@prosolen.net/${user.userNode}`,
    id: 'userNode',
    to: `${user.roomName}@conference.prosolen.net`,
    type: 'set'
  }).c('query', {
    xmlns: 'http://jabber.org/protocol/muc#owner'
  }).c('x', {
    xmlns: 'jabber:x:data',
    type: 'submit'
  })
// @ts-ignore
  glagol.connection.send(message)
}

function inviteRoom() {
  // @ts-ignore
  const { Strophe } = window.global
  // @ts-ignore
  const { user } = glagol
  // @ts-ignore
  const glagol = glagol
  const invitation = {
    action: "INVITATION",
    localTracks: {
      audio: true,
      video: true
    }
  }
  const inviteMessageB64 = btoa(JSON.stringify(invitation))

  const message = new Strophe.Builder('message', {
    to: 'focus@prosolen.net/focus',
    type: 'chat',
    xmlns: 'jabber:client'
  }).c('x', {
    xmlns: 'jabber:x:conference',
    jid: `${user.roomName}@conference.prosolen.net`
  }).up().c('nick', {
    xmlns: 'http://jabber.org/protocol/nick'
  }).t(user.displayName).up().c('jimble').t(inviteMessageB64)
  // @ts-ignore
  glagol.connection.send(message)
}

export { validaterRoom, inviteRoom }