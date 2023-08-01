function handlersConference() {

  function handlerPresence(stanza: any) {
    // @ts-ignore
    const { Strophe } = window.global
    // @ts-ignore
    const { user } = window.glagol
    const to = stanza.getAttribute('to').split('@')[0]
    const xAttributes = stanza.getElementsByTagName('x')
    console.log(to, user.roomName)
    if (to === user.userNode) {
      const statuses = xAttributes[1].getElementsByTagName('status')
      Array.from(statuses).forEach((status: any) => {
        if (Number(status.getAttribute('code')) === 201) {
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
          window.glagol.connection.send(message)
        }
      })
    }
    console.log(stanza, 'Stanza')
    return true
  }

  function handlerIq(stanza: any) {
    console.log(stanza, 'IQ')
    return true
  }
function handlerAll(stanza: any) {
    console.log(stanza, 'ALL')
  return true
}
  // @ts-ignore
  window.glagol.connection.addHandler(handlerPresence, '', 'presence')
  // @ts-ignore
  window.glagol.connection.addHandler(handlerIq, '', 'iq')
  window.glagol.connection.addHandler(handlerAll, '','')

}

export { handlersConference }