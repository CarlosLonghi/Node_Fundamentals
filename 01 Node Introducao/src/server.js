import http from "node:http";
import { json } from "./middlewares/json.js";

/* ----------- MÉTODOS HTTP ----------- */
// GET => BUSCAR UM RECURSO DO BACK-END
// POST => CRIAR UM RECURSO NO BACK-END
// PUT => ATUALIZAR UM RECURSO NO BACK-END
// PATCH => ATUALIZAR UMA INFORMAÇÃO ESPECIFICA DE UM RECURSO DO BACK-END
// DELETE => DELETAR UM RECURSO DO BACK-END

/* ------------- METADADOS ------------- */
// HEADER(CABEÇALHOS) => REQUISIÇÃO/RESPOSTA

const users = [];

const server = http.createServer(async (req, res) => {
    const { method, url} = req;

    await json(req, res)

    if (method === 'GET' && url === '/users') {
        return res
        .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        const { name, email} = req.body

        users.push({ 
            id: 1,
            name,
            email
        });

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333);