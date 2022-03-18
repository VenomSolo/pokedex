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
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={useAppSelector(selectName)}
                    onChange={(e) => dispatch(changeName(e.target.value))} />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={useAppSelector(selectType)}
                        label="Age"
                        onChange={(e) => dispatch(changeType(e.target.value))}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'flying'}>Flying</MenuItem>
                        <MenuItem value={'fighting'}>Fighting</MenuItem>
                        <MenuItem value={'fire'}>Fire</MenuItem>
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