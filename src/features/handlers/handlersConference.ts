function handlersConference() {
  function handlerMessage (stanza: any){
    console.log(stanza, 'Stanza')
    return true
  }
  // @ts-ignore
window.glagol.connection.addHandler(handlerMessage)
}

export {handlersConference}