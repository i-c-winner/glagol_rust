function handlersConference() {
  // @ts-ignore
  window.glagol.connection.addHandler(handlerMessage)
}
function handlerMessage(stanza: any) {
  console.log(stanza, 'Stanza')
}
export {handlersConference}