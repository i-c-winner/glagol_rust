import { Main } from "../../../pages";
import { useState } from "react";
import * as strophe from "strophe.js"
import { config, setRegister } from "../../../shared";
import { useAsync } from "react-async";
import { handlersConference, PeerConnection } from "../../../features";
import { getRandomText } from "../../../shared";
import { useSelector, useDispatch } from "react-redux";
import { addDisplayName, addUserNode, GlagolSlice } from "../../index";
// @ts-ignore
const { Strophe } = strophe
setRegister(strophe)
const userNode = getRandomText(5)
const password = getRandomText(8)
const connect = async () => {
  return await new Strophe.Connection(config.xmppUrls)
}
let firstLoad = true

const StartPage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: GlagolSlice) => state.user)
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
        if (firstLoad) {
          // @ts-ignore
          window.glagol.connection = connection
          handlersConference()
          // @ts-ignore
          dispatch(addUserNode(userNode))
          window.glagol.user = {
            userNode,
            password
          }
          const peerConnection = new PeerConnection()
          peerConnection.createHandlers()
          // @ts-ignore
          window.glagol.peerConnection = peerConnection
          setConnected(true)
          firstLoad = false
        }

        // do something after successful authentication
      } else {
        // Do other stuff
      }
    }

    if (firstLoad) connection.register.connect("prosolen.net", callback)
  }
  {
    return connected ? <Main/> : null
  }
}
export default StartPage