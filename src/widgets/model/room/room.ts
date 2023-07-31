function createOffer(){
  // @ts-ignore
  window.glagol.peerConnection.pc.createOffer().then((offer: any)=>{
    // @ts-ignore
    window.glagol.peerConnection.pc.setLocalDescription(offer)

    // @ts-ignore
  })
}
export {createOffer}