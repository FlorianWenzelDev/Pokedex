
function getType(typetext) {
    return `<li class="pokemon-type">${typetext}</li>`
}


function getSmallPokemonCard(pokemon, pokemonName ,pokemonTypes){
    return `
                <li>
                <button class="small-pokemon-card ${pokemon.types[0].type.name}">
                    <p>#${pokemon.id}</p>
                    <h2>${pokemonName}</h2>
                    <div class="small-card-styling-wrapper">
                    <ul id="type-list">
                        ${pokemonTypes}
                    </ul>
                    <img id="pokemonImg"
                        src="${pokemon.sprites.front_default}" alt="">
                    </div>
                </button>
            </li>`
}

