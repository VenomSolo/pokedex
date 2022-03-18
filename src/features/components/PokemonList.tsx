//import "./styles.css";
import { Card, Divider, Avatar, List, ListItemAvatar, ListItemText, ListItemButton } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFilters } from './filtersSlice';
import { fetchListAsync, filterPokemon, pickPokemon, selectFiltered, selectOffset, toggleHidden } from './pokemonSlice';

export function Tiles() {

}

export function PokemonList() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const offset = useAppSelector(selectOffset);
  const data = useAppSelector(selectFiltered);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnPickable, setBtnPickable] = useState(true);
  const time = 300;

  return (
    <div>
      <Card sx={{ border: '1px solid', borderColor: 'primary.main' }}>
        <List sx={{
          width: '100%',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 'calc(85vh)',
          '& ul': { padding: 0 },
        }} color='primary'>
          {data.map((data) => {
            return (
              <>
                <ListItemButton key={data.name} onClick={() => {
                  if (!btnPickable) return;
                  setBtnPickable(false)
                  dispatch(toggleHidden())
                  setTimeout(() => setBtnPickable(true), 3 * time);
                  setTimeout(() => {
                    dispatch(pickPokemon(data))
                    setTimeout(() => dispatch(toggleHidden()), time)
                  }, time);
                }}>
                  <ListItemAvatar>
                    <Avatar
                      src={data.sprite}
                      sx={{ width: 56, height: 56 }}
                      variant="square">
                    </Avatar>
                  </ListItemAvatar>
                  <div style={{ width: '10%' }}></div>
                  <ListItemText
                    primary={data.name}
                    secondary={'Types: ' + data.types.toString()}
                  />
                </ListItemButton>
                <Divider />
              </>
            );
          })}
          <>
            <ListItemButton disabled={btnDisabled} key='More' onClick={() => {
              setBtnDisabled(true);
              dispatch(fetchListAsync(offset))
                .then(() => dispatch(filterPokemon(filters)))
                .then(() => setBtnDisabled(false))
            }}>
              <ListItemText
                primary='More'
                secondary='Load more pokemons and re-filter'
              />
            </ListItemButton>
            <Divider />
          </>
        </List>
      </Card>
    </div>
  )

}

export default List;