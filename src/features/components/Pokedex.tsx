import React from 'react';
import styles from './Components.module.css'
import { Display } from './Display';
import { Sidebar } from './Sidebar';

export function Pokedex() {
    return (
        <div className={styles.pokedex}>
            <Sidebar />
            <Display />
        </div>
    )
}