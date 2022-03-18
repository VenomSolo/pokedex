import { ThemeOptions } from '@mui/material';
import { red } from '@mui/material/colors';


export const lightTheme: ThemeOptions = {
  palette: {
    primary: { main: red[500] },
    mode: 'light'
  }
}

export const darkTheme: ThemeOptions = {
  palette: {
    primary: { main: red[900] },
    mode: 'dark'
  }
}