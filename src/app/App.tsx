import { darkTheme } from "./themes/theme";
import { ThemeProvider } from "@mui/material";
import Main from "../pages/main/Main";


function App() {

  return (
    <ThemeProvider theme={darkTheme}>
    <Main />
    </ThemeProvider>
  )
}

export default App