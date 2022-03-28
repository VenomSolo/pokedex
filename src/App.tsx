import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useDarkMode } from "./features/theme/useDarkMode"
import { lightTheme, darkTheme } from "./features/theme/themes"
import Toggle from "./features/theme/Toggler"
import './App.css';
import { CssBaseline } from '@mui/material';
import { Pokedex } from './features/components/Pokedex';

function App() {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const themeProp = createTheme(themeMode)

  return (
    <ThemeProvider theme={themeProp}>
      <CssBaseline />
      <>
        <div className="App">
          <header className="App-header">
            <div className='Toggle'>
              <Toggle theme={theme} toggleTheme={themeToggler} />
            </div>
          </header>
          <div>
            <Pokedex />
          </div>
        </div>
      </>
    </ThemeProvider >
  );
}

export default App;
