async function buscarPokemon() {
    const nombre = document
        .getElementById("pokemonInput")
        .value
        .toLowerCase();

    const contenedor = document.getElementById("contenedor-tarjetas");
    const contenedor2 = document.getElementById("contenedor-tarjetas2");

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nombre}`
        );

        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        const pokemon = await response.json();

        contenedor.innerHTML = `
            <div style="text-align: center">
                <h2>-${pokemon.name.toUpperCase()}-</h2>
            </div>
            <div id="tarjeta-imgs">
                <img onclick="playCry('${pokemon.cries.latest}')" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <img onclick="playCry('${pokemon.cries.latest}')" src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
            </div>
            <div>
                <p><strong>ID:</strong> ${pokemon.id}</p>
                <p><strong>Height:</strong> ${pokemon.height}</p>
                <p><strong>Weight:</strong> ${pokemon.weight}</p>
                <p><strong>Type:</strong> ${pokemon.types
                    .map(tipo => tipo.type.name)
                    .join(", ")}</p>     
            </div>
        `;

        contenedor2.innerHTML = `
                    <p><strong>Abilities:</strong> ${pokemon.abilities
                        .map(ability => ability.ability.name)
                        .join(", ")}</p><br>
                    <p><strong>Moves:</strong> ${pokemon.moves
                        .map(move => move.move.name)
                        .join(", ")}</p>
        `;


        
    } catch (error) {
        contenedor.innerHTML = `
            <div class="tarjeta">
                <p>${error.message}</p>
            </div>
        `;
    }  
}

function playCry(url) {
    const audio = new Audio(url);
    audio.volume = 0.2;
    audio.play();
}