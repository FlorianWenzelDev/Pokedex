
const BASE_URL = "https://pokeapi.co/api/v2/";
let loadedPokemonCounter = 0;
let fetchedPokemons = []; 

function init() {
    fetchPokemons();
}

async function fetchPokemons() {
    let pokemons = (await fetch(BASE_URL + `/pokemon?limit=20&offset=${loadedPokemonCounter}`))
    let pokemonsAsJson = await pokemons.json();
    let pokemonNames = [];
    for (let pokemonIndex = 0; pokemonIndex < pokemonsAsJson.results.length; pokemonIndex++) {
        pokemonNames.push(pokemonsAsJson.results[pokemonIndex].name);
        loadedPokemonCounter++;
    }
    renderFetchedPokemons(pokemonNames);
}

async function getNewPokemonsData(pokemonNamesArray) {
    let ArrayOfPokemonData = []
    for (let index = 0; index < pokemonNamesArray.length; index++) {
        ArrayOfPokemonData.push(await fetchPokemon(pokemonNamesArray[index]));
    }
    return ArrayOfPokemonData;
}

async function renderFetchedPokemons(pokemonNames) {
    let pokemonListRef = document.getElementById("listOfPokemon");
    let pokemonData = await getNewPokemonsData(pokemonNames);
    let renderCards = "";
    for (let index = 0; index < pokemonData.length; index++) {
        renderCards += renderSmallPokemonCard(pokemonData[index]);
    }
    pokemonListRef.innerHTML += renderCards; 
}

async function fetchPokemon(pokemonName) {
    let pokemon = (await fetch(BASE_URL + "/pokemon/" + `${pokemonName}`));
    let fetchedPokemon = await pokemon.json();
    fetchedPokemons += fetchedPokemon
    return fetchedPokemon;
}

function renderSmallPokemonCard(pokemon) {
    let pokemonTypes = renderPokemonTypes(pokemon);
    let pokemonName = capitalizeWord(pokemon.name);
    return getSmallPokemonCard(pokemon, pokemonName, pokemonTypes);
}

function renderPokemonTypes(pokemon) {
    let typeList = "";
    for (let index = 0; index < pokemon.types.length; index++) {
        typeList += getType(capitalizeWord(pokemon.types[index].type.name));
    }
    return typeList
}

function capitalizeWord(word) {
    let firstLetter = word.slice(0, 1).toUpperCase();
    word = firstLetter + word.slice(1);
    return word;
}

