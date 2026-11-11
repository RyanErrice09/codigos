// Endpoint base da PokeAPI oficial
const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

// Mapeamento através do ID da div no HTML
const pokemonContainer = document.getElementById('pokemonContainer');

// 1. READ (Buscar Pokémons) com limite inicial
async function renderizarPokemons(limite = 12, offset = 0) {
    try {
        // Busca a lista inicial de pokémons
        const res = await fetch(`${POKEAPI_URL}?limit=${limite}&offset=${offset}`);
        const dados = await res.json();

        // Limpa o container antes de desenhar
        pokemonContainer.innerHTML = '';

        // 2. Para cada Pokémon da lista, busca os detalhes individuais (Imagem e tipos)
        for (const item of dados.results) {
            const resDetalhes = await fetch(item.url);
            const pokemon = await resDetalhes.json();

            // 3. Monta os badges de tipo
            const tiposHTML = pokemon.types
                .map(t => `<span class="type-badge">${t.type.name}</span>`)
                .join('');

            // 4. Cria o elemento HTML do Card na memória
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('pokemon-card');

            // 5. Injeta o conteúdo via template string
            cardDiv.innerHTML = `
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p><strong>#${pokemon.id}</strong></p>
                <h3>${pokemon.name}</h3>
                <div>${tiposHTML}</div>
            `;

            // 6. Insere o card na tela
            pokemonContainer.appendChild(cardDiv);
        }
    } catch (erro) {
        pokemonContainer.innerHTML = `<p style="color:red;">Erro ao carregar os Pokémons: ${erro.message}</p>`;
    }
}

// Executa ao carregar a página
renderizarPokemons();