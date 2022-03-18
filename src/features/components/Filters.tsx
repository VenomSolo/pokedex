import React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeType, selectType, changeName, selectName, selectFilters } from './filtersSlice';
import SearchIcon from '@mui/icons-material/Search'
import styles from './Components.module.css'
import { filterPokemon } from './pokemonSlice';

export function Filters() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectFilters);
    return (
        <div className={styles.filters}>
            <Stack spacing={2} direction="row" justifyContent="space-around">
                <TextField fullWidth
                    id="NameInput"
                    variant="outlined"
                    value={useAppSelector(selectName)}
                    onChange={(e) => dispatch(changeName(e.target.value))} />
                <FormControl fullWidth>
                    <InputLabel id="TypeInput">Type</InputLabel>
                    <Select
                        value={useAppSelector(selectType)}
                        onChange={(e) => dispatch(changeType(e.target.value))}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'normal'}>Normal</MenuItem>
                        <MenuItem value={'fighting'}>Fighting</MenuItem>
                        <MenuItem value={'flying'}>Flying</MenuItem>
                        <MenuItem value={'poison'}>Poison</MenuItem>
                        <MenuItem value={'ground'}>Ground</MenuItem>
                        <MenuItem value={'rock'}>Rock</MenuItem>
                        <MenuItem value={'bug'}>Bug</MenuItem>
                        <MenuItem value={'ghost'}>Ghost</MenuItem>
                        <MenuItem value={'steel'}>Steel</MenuItem>
                        <MenuItem value={'fire'}>Fire</MenuItem>
                        <MenuItem value={'water'}>Water</MenuItem>
                        <MenuItem value={'grass'}>Grass</MenuItem>
                        <MenuItem value={'electric'}>Electric</MenuItem>
                        <MenuItem value={'psychic'}>Psychic</MenuItem>
                        <MenuItem value={'ice'}>Ice</MenuItem>
                        <MenuItem value={'dragon'}>Dragon</MenuItem>
                        <MenuItem value={'dark'}>Dark</MenuItem>
                        <MenuItem value={'fairy'}>Fairy</MenuItem>
                    </Select>
                </FormControl>
                <Button color="primary" variant="contained"
                    onClick={(e) => dispatch(filterPokemon(filters))}>
                    <SearchIcon />
                </Button>
            </Stack>
        </div>
    )
}