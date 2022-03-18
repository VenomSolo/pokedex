import React from 'react';
import { Filters } from './Filters'
import { PokemonList } from './PokemonList';
import styles from './Components.module.css'

export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div>
                <Filters />
            </div>
            <div>
                <PokemonList />
            </div>
        </div>
    )
}