import { Props } from "../types/types";
import { Box, Button } from "@mui/material";
import { Input } from "@mui/material";
import styles from "./styles";
import { useRef, useState } from "react";
import { getRandomText } from "../../../shared";

function Creator(props: Props) {
  const refInput = useRef<HTMLInputElement>(null)
  const [ inputText, setInputText ] = useState<string>('')


  function action() {
    if (inputText === '') {
      props.actionClick(getRandomText(5))
    } else {
      if (refInput.current !== null) props.actionClick(inputText)
    }
  }

  function inputChange() {
    if (refInput.current !== null) setInputText(refInput.current.value)
  }

  return (
    <Box sx={styles.box}>
      <Input onChange={inputChange} inputRef={refInput} />
      <Button sx={styles.button} variant="outlined" onClick={action}>{props.state==='creatingRoom'? 'Creater Room': 'creater' +
        ' Name'}</Button>
    </Box>
  )
}

export { Creator }