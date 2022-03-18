import React from 'react'
import { func, string } from 'prop-types';
import { IconButton } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'

export function Toggle({ theme, toggleTheme }:
    { theme: string, toggleTheme: (() => void), }) {
    return (
        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;