//import "./styles.css";
import { Card, Divider, Avatar, List, ListItemAvatar, ListItemText, ListItemButton } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFilters } from './filtersSlice';
import { fetchListAsync, filterPokemon, pickPokemon, selectFiltered, selectOffset, toggleHidden } from './pokemonSlice';
import { listStyle } from './PokemonList.styles';
import { getTypes } from './PokemonList.styles';

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

  const onClickHandler = async () => {
    setBtnDisabled(true);

    await dispatch(fetchListAsync(offset))
    await dispatch(filterPokemon(filters))
    setBtnDisabled(false)
  }


  return (
    <div>
      <Card sx={{ border: '1px solid', borderColor: 'primary.main' }}>
        <List sx={listStyle} color='primary'>
          {data.map((data) => {
            return (
              <React.Fragment key={data.name}>
                <ListItemButton onClick={() => {
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
                    secondary={getTypes(data.types)}
                  />
                </ListItemButton>
                <Divider />
              </React.Fragment>
            );
          })}
          <React.Fragment key={"More"}>
            <ListItemButton disabled={btnDisabled} key='More' onClick={onClickHandler}>
              <ListItemText
                primary='More'
                secondary='Load more pokemons and re-filter'
              />
            </ListItemButton>
            <Divider />
          </React.Fragment>
        </List>
      </Card>
    </div>
  )

}

export default List;