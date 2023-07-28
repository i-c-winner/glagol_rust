import * as strophe from 'strophe.js'
import {config, setRegister, getRandomText} from "../../../shared";
setRegister(strophe)
console.log('conference')

const {Strophe}: any=strophe
const connect= new Promise((resolve: any, reject: any)=>{
  resolve( new  Strophe.Connection(config.xmppUrls))
  reject(new Error('ошибка соеденения'))
})

connect.then((connection: any)=>{
  function callback (status: number) {
    //@ts-ignore
    if (status === Strophe.Status.REGISTER) {
      // fill out the fields
      connection.register.fields.username = getRandomText(5);
      connection.register.fields.password = getRandomText(6);
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
      console.log(window)
      window.glagol.connection=connection
      console.log('connection')
      // do something after successful authentication
    } else {
      // Do other stuff
    }
  };
  connection.register.connect('prosolen.net', callback)
})
