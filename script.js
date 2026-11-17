const BASE_URL = "https://pokeapi.co/api/v2/";
let loadedPokemonCounter = 0;
let fetchedPokemons = [];
let fetchedAbilities = {};

function init() {
  showLoadingScreenDuringLoading(true);
  fetchPokemons();
  enableSearchButton();
}

async function fetchPokemons() {
  let pokemons = await fetch(BASE_URL + `/pokemon?limit=20&offset=${loadedPokemonCounter}`);
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
  let ArrayOfPokemonData = [];
  for (let index = 0; index < pokemonNamesArray.length; index++) {
    ArrayOfPokemonData.push(await fetchPokemonDataByName(pokemonNamesArray[index]));
  }
}

async function renderFetchedPokemons(pokemonNames, fullreload = false) {
  let pokemonListRef = document.getElementById("listOfPokemon");
  fullreload ? (pokemonListRef.innerHTML = "") : "pokemonListRef.innerHTML = pokemonListRef.innerHTML";
  let listenLaenge = document.querySelectorAll("#listOfPokemon > li").length;
  let renderCards = "";
  for (let index = 0; index < pokemonNames.length; index++) {
    renderCards += renderSmallPokemonCard(fetchedPokemons[index + listenLaenge], [index + listenLaenge]);
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

function renderNothingFoundScreen() {
  let pokemonListRef = document.getElementById("listOfPokemon");
  pokemonListRef.innerHTML = getNothingFoundScreen();
  showLoadingScreenDuringLoading(false);
}

function checkSearchResult(idArray) {
  if (idArray.length > 0) {
    renderSearchedPokemons(idArray);
  } else {
    renderNothingFoundScreen();
  }
}

async function fetchPokemonDataByName(pokemonName) {
  let pokemon = await fetch(BASE_URL + "/pokemon/" + `${pokemonName}`);
  let fetchedPokemon = await pokemon.json();
  fetchedPokemons.push(fetchedPokemon);
  return fetchedPokemon;
}

function renderSmallPokemonCard(pokemon, pokemonIndex) {
  let pokemonTypes = renderPokemonTypes(pokemon);
  let pokemonName = capitalizeWord(pokemon.name);
  return getSmallPokemonCard(pokemon, pokemonName, pokemonTypes, pokemonIndex);
}

function renderPokemonTypes(pokemon) {
  let typeList = "";
  for (let index = 0; index < pokemon.types.length; index++) {
    typeList += getType(capitalizeWord(pokemon.types[index].type.name));
  }
  return typeList;
}

function capitalizeWord(word) {
  let firstLetter = word.slice(0, 1).toUpperCase();
  word = firstLetter + word.slice(1);
  return word;
}

function enableSearchButton() {
  let searchButtonRef = document.getElementById("searchBtn");
  let searchInputRef = document.getElementById("searchInput");
  if (searchInputRef.value.length >= 3) {
    searchButtonRef.disabled = false;
  } else {
    searchButtonRef.disabled = true;
    renderFetchedPokemons(fetchedPokemons, true);
  }
}

function searchForPokemons() {
  let searchInputRef = document.getElementById("searchInput");
  let foundPokemons = [];
  showLoadingScreenDuringLoading(true);
  for (let index = 0; index < fetchedPokemons.length; index++) {
    if (fetchedPokemons[index].name.includes(searchInputRef.value.toLowerCase())) {
      foundPokemons.push(fetchedPokemons[index].id);
    }
  }
  checkSearchResult(foundPokemons);
  // renderSearchedPokemons(foundPokemons);
}

function searchWithEnter(event) {
  let searchInputRef = document.getElementById("searchInput");
  if (event.key === "Enter" && searchInputRef.value.length >= 3) {
    searchForPokemons();
  }
}

function showLoadingScreenDuringLoading(loadingActive) {
  let mainContentRef = document.getElementById("mainContent");
  let loadingScreenRef = document.getElementById("loadingScreen");
  if (loadingActive) {
    mainContentRef.hidden = true;
    loadingScreenRef.hidden = false;
  } else {
    mainContentRef.hidden = false;
    loadingScreenRef.hidden = true;
  }
}

function callLoadingFunctions() {
  showLoadingScreenDuringLoading(true);
  fetchPokemons();
}

async function openBigPokemonCard(pokemonIndex) {
  document.getElementById("pokemonDialog").showModal();
  let pokemonTypes = renderPokemonTypes(fetchedPokemons[pokemonIndex]);
  let pokemonName = capitalizeWord(fetchedPokemons[pokemonIndex].name);
  let sliderData = await renderBigCardTabSections(fetchedPokemons[pokemonIndex]);
  let dialogRef = document.getElementById("pokemonDialog");
  dialogRef.innerHTML = "";
  dialogRef.innerHTML = getLargePokeonCard(fetchedPokemons[pokemonIndex], pokemonName, pokemonTypes, sliderData);
}

function closeDialog() {
  document.getElementById("pokemonDialog").close();
}

function changeTabOnBigPokemonCard(tabposition) {
  let sliderRef = document.getElementById("furtherDataSlider");
  sliderRef.dataset.tabvalue = tabposition;
}

async function renderBigCardTabSections(pokemon) {
  let tabSectionHtml = "";
  tabSectionHtml += getPokemonStatsSection(pokemon);
  tabSectionHtml += getShinyPokemonSection(pokemon);
  tabSectionHtml += getPokemonAbilitySection(await renderAbilitiesSection(pokemon));
  return tabSectionHtml;
}

function getAbilityNames(pokemon) {
  let pokemonAbilities = pokemon.abilities;
  let abilityNames = [];
  for (let pokemonAbilityIndex = 0; pokemonAbilityIndex < pokemonAbilities.length; pokemonAbilityIndex++) {
    abilityNames.push(pokemonAbilities[pokemonAbilityIndex].ability.name);
  }
  return abilityNames;
}

async function fetchAbilitiyByName(abilityName) {
  let ability = await fetch(BASE_URL + "ability/" + `${abilityName}`);
  let abilityAsJson = await ability.json();
  return abilityAsJson;
}

function getAbilityShortDescription(ability) {
  for (let abilityIndex = 0; abilityIndex < ability.effect_entries.length; abilityIndex++) {
    if (ability.effect_entries[abilityIndex].language.name === "en") {
      return ability.effect_entries[abilityIndex].short_effect;
    }
  }
}

function getAbilityName(ability) {
  for (let abilityIndex = 0; abilityIndex < ability.names.length; abilityIndex++) {
    if (ability.names[abilityIndex].language.name === "en") {
      return ability.names[abilityIndex].name;
    }
  }
}

async function addAbilitesToStorage(abilityName) {
  let ability = await fetchAbilitiyByName(abilityName);
  let name = abilityName;
  let abilityData = {
    name: getAbilityName(ability),
    description: getAbilityShortDescription(ability),
  };
  fetchedAbilities[abilityName] = abilityData;
}

async function getAllAbilitesData(abilityNames) {
  for (let index = 0; index < abilityNames.length; index++) {
    if (!Object.hasOwn(fetchedAbilities, abilityNames[index])) {
      await addAbilitesToStorage(abilityNames[index]);
    }
  }
}

async function renderAbilitiesSection(pokemon) {
  let abilityNames = getAbilityNames(pokemon);
  await getAllAbilitesData(abilityNames);
  return renderCard(abilityNames);
}

async function renderCard(abilityNames, dummy) {
  let abilitiesRef = "";
  for (let index = 0; index < abilityNames.length; index++) {
    abilitiesRef += getPokemonAbility(abilityNames[index]);
  }
  return abilitiesRef;
}
