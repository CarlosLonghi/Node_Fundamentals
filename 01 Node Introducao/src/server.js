import http from "node:http";

/* ----------- MÉTODOS HTTP ----------- */
// GET => BUSCAR UM RECURSO DO BACK-END
// POST => CRIAR UM RECURSO NO BACK-END
// PUT => ATUALIZAR UM RECURSO NO BACK-END
// PATCH => ATUALIZAR UMA INFORMAÇÃO ESPECIFICA DE UM RECURSO DO BACK-END
// DELETE => DELETAR UM RECURSO DO BACK-END

/* ------------- METADADOS ------------- */
// HEADER(CABEÇALHOS) => REQUISIÇÃO/RESPOSTA

const users = [];

const server = http.createServer((req, res) => {
    const { method, url} = req;

    if (method === 'GET' && url === '/users') {
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        users.push({ 
            id: 1,
            name: 'Carlos',
            email: 'carlos@gmail.com'
        });

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end('Not Found :(');
})

server.listen(3333);