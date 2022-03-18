import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { fetchListAsync, filterPokemon, pickPokemon } from './features/components/pokemonSlice';

const initPokemon = {
  name: "Bulbasaur",
  types: ["grass", "poison"],
  weight: 69,
  height: 7,
  sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
}

store.dispatch(pickPokemon(initPokemon))

store.dispatch(fetchListAsync(0))
  .then(() => store.dispatch(filterPokemon({ name: "", type: "all" })))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
