
const BASE_URL = "https://pokeapi.co/api/v2/";
let loadedPokemonCounter = 0;
let fetchedPokemons = []; 

function init() {
    showLoadingScreenDuringLoading(true);
    fetchPokemons();
    enableSearchButton()
}

async function fetchPokemons() {
    let pokemons = (await fetch(BASE_URL + `/pokemon?limit=20&offset=${loadedPokemonCounter}`))
    let pokemonsAsJson = await pokemons.json();
    let pokemonNames = [];
    for (let pokemonIndex = 0; pokemonIndex < pokemonsAsJson.results.length; pokemonIndex++) {
        pokemonNames.push(pokemonsAsJson.results[pokemonIndex].name);
        loadedPokemonCounter++;
    }
    await getNewPokemonsData(pokemonNames);    
    renderFetchedPokemons(pokemonNames);
}

async function getNewPokemonsData(pokemonNamesArray) {
    let ArrayOfPokemonData = []
    for (let index = 0; index < pokemonNamesArray.length; index++) {
        ArrayOfPokemonData.push(await fetchPokemonDataByName(pokemonNamesArray[index]));
    }
    return ArrayOfPokemonData;
}

async function renderFetchedPokemons(pokemonNames, fullreload=false) {
    let pokemonListRef = document.getElementById("listOfPokemon");
    console.log(pokemonListRef.innerHTML);
    (fullreload) ? pokemonListRef.innerHTML = "" : "pokemonListRef.innerHTML = pokemonListRef.innerHTML";
    let listenLaenge = document.querySelectorAll('#listOfPokemon > li').length;
    let renderCards = "";
    for (let index = 0; index < pokemonNames.length; index++) {
        renderCards += renderSmallPokemonCard(fetchedPokemons[index + listenLaenge]);
    }
    pokemonListRef.innerHTML += renderCards; 
    showLoadingScreenDuringLoading(false);
}

function renderSearchedPokemons(idArray) {
    let pokemonListRef = document.getElementById("listOfPokemon");
        let renderCards = "";
        pokemonListRef.innerHTML = "";
    for (let index = 0; index < idArray.length; index++) {
        renderCards += renderSmallPokemonCard(fetchedPokemons[idArray[index] - 1]);
    }
    pokemonListRef.innerHTML += renderCards; 
    showLoadingScreenDuringLoading(false);
}

async function fetchPokemonDataByName(pokemonName) {
    let pokemon = (await fetch(BASE_URL + "/pokemon/" + `${pokemonName}`));
    let fetchedPokemon = await pokemon.json();
    fetchedPokemons.push(fetchedPokemon); 
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

function enableSearchButton() {
    let searchButtonRef = document.getElementById("searchBtn");
    let searchInputRef = document.getElementById("searchInput");
    if (searchInputRef.value.length >= 3){
        searchButtonRef.disabled = false;
    }
    else{
        searchButtonRef.disabled = true;
        renderFetchedPokemons(fetchedPokemons, true)
    }
}

function searchForPokemons() {
    let searchInputRef = document.getElementById("searchInput");
    let foundPokemons = [];
    showLoadingScreenDuringLoading(true);
    for (let index = 0; index < fetchedPokemons.length; index++) {
        if (fetchedPokemons[index].name.includes(searchInputRef.value.toLowerCase())){
            foundPokemons.push(fetchedPokemons[index].id);
        }    
    }
    renderSearchedPokemons(foundPokemons);
}

function searchWithEnter(event) {
    let searchInputRef = document.getElementById("searchInput");
    if (event.key === "Enter" && searchInputRef.value.length >= 3){
        searchForPokemons();
    }
}

function showLoadingScreenDuringLoading(loadingActive) {
    let mainContentRef = document.getElementById("mainContent");
    let loadingScreenRef = document.getElementById("loadingScreen");
    if (loadingActive){
        mainContentRef.hidden = true;
        loadingScreenRef.hidden = false;
    }
    else{
    mainContentRef.hidden = false;
        loadingScreenRef.hidden = true;
    }
}

function callLoadingFunctions() {
    showLoadingScreenDuringLoading(true);
    fetchPokemons();
}