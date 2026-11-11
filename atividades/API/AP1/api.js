const API_URL = 'http://localhost:3000/api/pokemons';

const form = document.getElementById('pokemonForm');
const nomeInput = document.getElementById('nomeInput');
const tipoInput = document.getElementById('tipoInput');
const listaPokemons = document.getElementById('listaPokemons');

async function carregarPokemons() {
    const res = await fetch(API_URL);
    const dados = await res.json();

    listaPokemons.innerHTML = '';

    dados.forEach(pokemon => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>#${pokemon.id} ${pokemon.nome}</strong> (${pokemon.tipo})</span>
            <button class="btn-del" onclick="deletarPokemon(${pokemon.id})">Excluir</button>
        `;
        listaPokemons.appendChild(li);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novoPokemon = {
        nome: nomeInput.value.trim(),
        tipo: tipoInput.value.trim()
    };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoPokemon)
    });

    if (res.ok) {
        nomeInput.value = '';
        tipoInput.value = '';
        carregarPokemons();
    }
});

async function deletarPokemon(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        carregarPokemons();
    }
}

carregarPokemons();