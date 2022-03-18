import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography, Fade } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';
import styles from './Components.module.css'
import CatchingPokemon from '@mui/icons-material/CatchingPokemon'
import { useAppSelector } from '../../app/hooks';
import { selectHidden, selectPicked } from './pokemonSlice';

export function Display() {
    const pokemon = useAppSelector(selectPicked)
    const visible = !useAppSelector(selectHidden)

    return (
        <div className={styles.display}>
            <Fade in={visible}>
                <Card sx={{ maxWidth: '60vw', border: '1px solid', borderColor: 'primary.main' }} variant='outlined'>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }}>
                                <CatchingPokemon />
                            </Avatar>
                        }
                        title={pokemon.name}
                        subheader={"Types: " + pokemon.types.toString()}
                    />
                    <CardMedia
                        component="img"
                        image={pokemon.sprite}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" align='left'>
                            <p>Weight: {pokemon.weight / 10}kg</p>
                            <p>Height: {pokemon.height / 10}m</p>
                        </Typography>
                    </CardContent>
                </Card>
            </Fade>
        </div >
    )
}