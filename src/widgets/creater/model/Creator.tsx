import { Props } from "../types/types";
import { Box, Button } from "@mui/material";
import { Input } from "@mui/material";
import styles from "./styles";

function Creator(props: Props) {
const timeInterval= setInterval(()=>{
  // @ts-ignore
  if (window.glagol.connected) {
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
      <Button sx={styles.button} onClick={action}>Создать</Button>
    </Box>
  )
}

export {Creator}