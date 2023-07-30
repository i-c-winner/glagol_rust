function createOffer(){
  // @ts-ignore
  window.glagol.peerConnection.pc.createOffer().then((offer: any)=>{
    // @ts-ignore
    window.glagol.peerConnection.pc.setLocalDescription(offer)
    const offer64= btoa(JSON.stringify(offer))
    // @ts-ignore
    window.glagol.connection.send(offer64)
  })
}
export {createOffer}