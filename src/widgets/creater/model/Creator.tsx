import { Props } from "../types/types";
import { Box, Button } from "@mui/material";
import { Input } from "@mui/material";
import styles from "./styles";
import { useState } from "react";

function Creator(props: Props) {
  const [stropheConnected, setStropheConnected]=useState(true)
const timeInterval= setInterval(()=>{
  // @ts-ignore
  if (window.glagol.connected) {
    setStropheConnected(false)
    console.log('interval')
    clearInterval(timeInterval)
  }
}, 300)
  function action() {
    props.actionClick()
  }


  return (
    <Box sx={styles.box}>
      <Input/>
      <Button disabled={stropheConnected} sx={styles.button} onClick={action}>Создать</Button>
    </Box>
  )
}

export {Creator}