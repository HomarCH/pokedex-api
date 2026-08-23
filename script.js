async function buscarPokemon() {
    const nombre = document
        .getElementById("pokemonInput")
        .value
        .toLowerCase();

    const contenedor = document.getElementById("contenedor-tarjetas");

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nombre}`
        );

        if (!response.ok) {
            throw new Error("Pokémon no encontrado");
        }

        const pokemon = await response.json();

        contenedor.innerHTML = `
            <div class="tarjeta">
                <h2>${pokemon.name.toUpperCase()}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p><strong>ID:</strong> ${pokemon.id}</p>
                <p><strong>Height:</strong> ${pokemon.height}</p>
                <p><strong>Weight:</strong> ${pokemon.weight}</p>
                <p><strong>Type:</strong> ${pokemon.types
                    .map(tipo => tipo.type.name)
                    .join(", ")}</p>
            </div>
        `;
    } catch (error) {
        contenedor.innerHTML = `
            <div class="tarjeta">
                <p>${error.message}</p>
            </div>
        `;
    }
}