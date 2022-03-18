import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { FiltersStruct } from './filtersSlice';

export interface Pokemon {
    name: string,
    types: string[],
    height: number,
    weight: number,
    sprite: string
}

export interface PokemonState {
    status: 'idle' | 'loading' | 'failed';
    offset: number;
    listAll: Pokemon[];
    listFiltered: Pokemon[];
    picked: Pokemon;
    hidden: boolean;
}

const initialState: PokemonState = {
    status: 'idle',
    offset: 0,
    listAll: [],
    listFiltered: [],
    picked: {
        name: "",
        types: [""],
        height: 0,
        weight: 0,
        sprite: ""
    },
    hidden: false
};

function fetchPokemon(req: string) {
    return new Promise<{ data: Pokemon[] }>((resolve, reject) => {
        let pokemonList: Pokemon[] = [];
        console.log(req)
        fetch(req)
            .then(res => res.json())
            .then(json => { console.log(json); return json })
            .then(
                async json => {
                    function getTypes(jsonObj: any): string[] {
                        let retVal = []
                        for (let type of jsonObj.types) {
                            retVal.push(type.type.name)
                        }
                        return retVal;
                    }
                    for (let pokemon of json.results) {
                        const pokemonRes = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.name);
                        if (!pokemonRes.ok) {
                            throw new Error("HTTP error, status = " + pokemonRes.status);
                        }
                        const pokemonJson = await pokemonRes.json()
                        pokemonList.push({
                            name: pokemonJson.name[0].toUpperCase() + pokemonJson.name.slice(1),
                            types: getTypes(pokemonJson),
                            weight: pokemonJson.weight,
                            height: pokemonJson.height,
                            sprite: pokemonJson.sprites.other["official-artwork"].front_default
                        })
                    }
                    resolve({ data: pokemonList });
                },

            )
            .catch(
                error => {
                    throw new Error(`HTTP error: ${error.status}`);
                }
            )
    })
}

export const fetchListAsync = createAsyncThunk(
    'pokemon/fetchList',
    async (offset: number, thunkApi) => {
        try {
            let req = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
            const response = await fetchPokemon(req);
            return response.data;
        }
        catch (error) {
            console.error(`Could not fetch Pokemons: ${error}`);
        }
        return [];
    }
);


export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        pickPokemon: (state, action: PayloadAction<Pokemon>) => {
            state.picked = action.payload;
            setTimeout(() => state.hidden = false, 200)
        },
        filterPokemon: (state, action: PayloadAction<FiltersStruct>) => {
            state.listFiltered = state.listAll.filter((pokemon) => {
                const pokeName = action.payload.name;
                const pokeType = action.payload.type
                return pokemon.name.toLowerCase().includes(pokeName.toLowerCase()) &&
                    (pokeType === 'all' ? true : pokemon.types.includes(pokeType))
            })
        },
        toggleHidden: (state) => {
            state.hidden = !state.hidden;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchListAsync.fulfilled, (state, action) => {
                state.offset += 20;
                state.listAll = state.listAll.concat(action.payload);
            });
    },

});

export const { pickPokemon, filterPokemon, toggleHidden } = pokemonSlice.actions;

export const selectOffset = (state: RootState) => state.pokemon.offset;
export const selectList = (state: RootState) => state.pokemon.listAll;
export const selectFiltered = (state: RootState) => state.pokemon.listFiltered;
export const selectPicked = (state: RootState) => state.pokemon.picked;
export const selectHidden = (state: RootState) => state.pokemon.hidden;

export default pokemonSlice.reducer;
