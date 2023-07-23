import createModel from "../model/creatorModel";
import { Props } from "../types/types";
import { Box, Button } from "@mui/material";
import { Input } from "@mui/material";
import styles from "../model/styles";
import { useEffect } from "react";

function Creator(props: Props) {
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

export default Creator