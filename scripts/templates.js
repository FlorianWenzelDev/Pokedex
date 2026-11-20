
function getType(typetext) {
    return `<li class="pokemon-type">${typetext}</li>`
}

function getSmallPokemonCard(pokemon, pokemonName ,pokemonTypes, pokemonIndex){
    return `
                <li>
                <button data-id="card" onclick="openBigPokemonCard(${pokemonIndex})" class="small-pokemon-card ${pokemon.types[0].type.name}" 
                aria-haspopup="dialog" aria-controls="pokemon-dialog" aria-label="open detailed pokemonview">
                    <p>#${pokemon.id}</p>
                    <h2>${pokemonName}</h2>
                    <div class="small-card-styling-wrapper">
                    <ul class="type-list">
                        ${pokemonTypes}
                    </ul>
                    <img data-id="card-image" id="pokemonImg"
                        src="${pokemon.sprites.front_default}" alt="pixelart image of the pokemon ${pokemonName}" aria-label="pixelart image of the pokemon ${pokemonName}">
                    </div>
                </button>
            </li>`
}

function getLargePokeonCard(pokemon, pokemonName, pokemonTypes, sliderData) {
    return `
            <button onclick="closeDialog()" data-id="close-dialog-button" class="close-btn"  aria-label="close detailed Pokemon View">
            <img src="./assets/icons/close.svg" alt="X Icon to close the dialog"></button>
            <div data-id="overlay-pokemon-name" class="general-pokemon-information ${pokemon.types[0].type.name}">
                <div class="pokemon-identifier">
                    <h2>${pokemonName}</h2>
                    <p class="pokemon-id">#${pokemon.id}</p>
                </div>
                <div class="pokemon-information-styling-div">
                    <ul class="type-list">
                        ${pokemonTypes}
                    </ul>
                    <img data-id="dialog-image" class="dialog-default-pokemon-img" aria-label="Image of the pokemon ${pokemonName}"
                        src="${pokemon.sprites.other.home.front_default}"
                        alt="Image of the pokemon ${pokemonName}">
                </div>
                <div class="tablist" role="tablist" aria-label="Additional pokemon Informations">
                    <button role="tab" onclick="changeTabOnBigPokemonCard(0, 'statsTab')" class="active-tab" id="statsTab" aria-controls="furtherDataSlider">Stats</button>
                    <button role="tab" onclick="changeTabOnBigPokemonCard(1, 'shinyTab')" id="shinyTab" aria-controls="furtherDataSlider">Shiny</button>
                    <button role="tab" onclick="changeTabOnBigPokemonCard(2, 'abilitiesTab')" id="abilitiesTab" aria-controls="furtherDataSlider">Abilities</button>
                </div>
                <section class="further-pokemon-data">
                <div role="tabpanel" class="further-data-wrapper" id="furtherDataSlider" data-tabvalue="0">
                    ${sliderData}
                </div>
            </section>
            <nav class="load-next-pokemon">
                <div class="next-pokemon-button-wrapper">
                <button aria-label="show previous pokemon" data-id="prev-button" class="nav-button" onclick="loadNextBigPokemonCard(-1)"><img src="./assets/icons/arrow_left .svg" alt="Arrow pointing to the left site"></button>
                <button aria-label="show next pokemon" data-id="next-button" class="nav-button" onclick="loadNextBigPokemonCard(+1)"><img src="./assets/icons/arrow_right.svg" alt="Arrow pointing to the right site"></button>
                </div>
            </nav>
            </div>
    `
}

function getPokemonStatsSection(pokemon) {
    return `<section class="stats-wrapper">
                <table class="stats">
                    <tr>
                        <th scope="row">HP:</th>
                        <td>${pokemon.stats[0].base_stat}</td>
                    </tr>
                    <tr>
                        <th scope="row">Atk:</th>
                        <td>${pokemon.stats[1].base_stat}</td>
                    </tr>
                    <tr>
                        <th scope="row">Def:</th>
                        <td>${pokemon.stats[2].base_stat}</td>
                    </tr>
                    <tr>
                        <th scope="row">Sp. Atk:</th>
                        <td>${pokemon.stats[3].base_stat}</td>
                    </tr>
                    <tr>
                        <th scope="row">Sp. Def:</th>
                        <td>${pokemon.stats[4].base_stat}</td>
                    </tr>
                    <tr>
                        <th scope="row">Spd:</th>
                        <td>${pokemon.stats[5].base_stat}</td>
                    </tr>
                </table>
            </section>
    `
}

function getShinyPokemonSection(pokemon) {
    return `<div class="shiny-img-wrapper">
                <img class="shiny-img"
                    src="${pokemon.sprites.other.home.front_shiny}"
                    alt="Shiny version of the pokemon ${pokemon.name}">
            </div>
    `
}

function getPokemonAbilitySection(pokemonAbilities) {
    return `<section class="abilities-wrapper">
                    <dl class="abilities">
                        ${pokemonAbilities}
                    </dl>
                </section>`
}

function getPokemonAbility(ability) {
   return `<dt>${fetchedAbilities[ability].name}</dt>
           <dd>${fetchedAbilities[ability].description}</dd>` 
}

function getNothingFoundScreen() {
    return `
        <p data-id="not-found" class="not-found">No match found.</p>
    `
}