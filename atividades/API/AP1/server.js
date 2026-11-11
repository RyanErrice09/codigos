const http = require('http');

let pokemons = [
    { id: 1, nome: "Pikachu", tipo: "Elétrico" },
    { id: 2, nome: "Charmander", tipo: "Fogo" }
];

const enviarJSON = (res, statusCode, dados) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dados));
};

const receberBody = (req) => {
    return new Promise((resolve) => {
        let corpo = '';
        req.on('data', chunk => {
            corpo += chunk.toString();
        });
        req.on('end', () => {
            resolve(corpo ? JSON.parse(corpo) : {});
        });
    });
};

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    try {
        const idMatch = req.url.match(/\/api\/pokemons\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1]) : null;

        if (req.url === '/api/pokemons' && req.method === 'GET') {
            return enviarJSON(res, 200, pokemons);
        }

        if (idMatch && req.method === 'GET') {
            const pokemon = pokemons.find(p => p.id === id);
            if (!pokemon) return enviarJSON(res, 404, { mensagem: "Pokémon não encontrado!" });
            return enviarJSON(res, 200, pokemon);
        }

        if (req.url === '/api/pokemons' && req.method === 'POST') {
            const { nome, tipo } = await receberBody(req);

            if (!nome || !tipo) {
                return enviarJSON(res, 400, { mensagem: "Nome e Tipo são obrigatórios!" });
            }

            const novoPokemon = {
                id: pokemons.length > 0 ? pokemons[pokemons.length - 1].id + 1 : 1,
                nome,
                tipo
            };

            pokemons.push(novoPokemon);
            return enviarJSON(res, 201, novoPokemon);
        }

        if (idMatch && req.method === 'PUT') {
            const { nome, tipo } = await receberBody(req);
            const index = pokemons.findIndex(p => p.id === id);

            if (index === -1) return enviarJSON(res, 404, { mensagem: "Pokémon não encontrado!" });

            pokemons[index] = { id, nome, tipo };
            return enviarJSON(res, 200, { mensagem: "Pokémon atualizado com sucesso!", pokemon: pokemons[index] });
        }

        if (idMatch && req.method === 'DELETE') {
            const index = pokemons.findIndex(p => p.id === id);

            if (index === -1) return enviarJSON(res, 404, { mensagem: "Pokémon não encontrado!" });

            const pokemonRemovido = pokemons.splice(index, 1);
            return enviarJSON(res, 200, { mensagem: "Pokémon deletado com sucesso!", pokemon: pokemonRemovido[0] });
        }

        enviarJSON(res, 404, { mensagem: "Rota não encontrada" });

    } catch (erro) {
        enviarJSON(res, 500, { mensagem: "Erro interno no servidor" });
    }
});

server.listen(3000, () => {
    console.log("🚀 Servidor API rodando em: http://localhost:3000");
});