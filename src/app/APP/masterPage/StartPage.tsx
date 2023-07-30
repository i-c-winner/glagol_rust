import { Main } from "../../../pages";
import { useState } from "react";
import * as strophe from "strophe.js"
import { config, setRegister } from "../../../shared";
import { useAsync } from "react-async";
import { handlersConference, PeerConnection } from "../../../features";
import { getRandomText } from "../../../shared";
// @ts-ignore
const { Strophe } = strophe
setRegister(strophe)
const userNode = getRandomText(5)
const password = getRandomText(8)
const connect = async () => {
  const connection = await new Strophe.Connection(config.xmppUrls)
  return connection
}

const StartPage = () => {
  const [ connected, setConnected ] = useState(false)
  const { data, error, isPending } = useAsync({ promiseFn: connect })
  if (isPending) return <p>...Pending</p>
  if (error) new Error('connecting Error')
  if (data) {
    const connection = data
    function callback(status: number) {
      //@ts-ignore
      if (status === Strophe.Status.REGISTER) {
        // fill out the fields
        connection.register.fields.username = userNode;
        connection.register.fields.password = password;
        // calling submit will continue the registration process
        connection.register.submit();
        //@ts-ignore
      } else if (status === Strophe.Status.REGISTERED) {
        console.log("registered!");
        // calling login will authenticate the registered JID.
        connection.authenticate();
        //@ts-ignore
      } else if (status === Strophe.Status.CONFLICT) {
        console.log("Contact already existed!");
        //@ts-ignore
      } else if (status === Strophe.Status.NOTACCEPTABLE) {
        console.log("Registration form not properly filled out.")
        //@ts-ignore
      } else if (status === Strophe.Status.REGIFAIL) {
        console.log("The Server does not support In-Band Registration")
      } else if (status === Strophe.Status.CONNECTED) {
        // @ts-ignore
        window.glagol.connection = connection
        // @ts-ignore
        window.glagol.user = {
          userNode,
          password
        }
        // @ts-ignore  console.log(connection)
        handlersConference()
        const peerConnection = new PeerConnection()
        // @ts-ignore
        window.glagol.peerConnection = peerConnection
        peerConnection.createHandlers()
        setConnected(true)

        // do something after successful authentication
      } else {
        // Do other stuff
      }
    }

    connection.register.connect('prosolen.net', callback)
  }
  {
    return connected ? <Main/> : null
  }




}
export default StartPage