import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

/* 
As 3 Formas do FRONT-END (ou outra aplicação que estiver consumindo a API) enviar informações para a API.
    - QUERY PARAMETERS: URL Stateful => Filtros, Paginação, etc.(Geralmente não são informações obrigatórias)
        http://localhost:3333/users?userId=1&name=Carlos

    - ROUTE PARAMETERS: Identificação de Recurso.
        GET/DELETE http://localhost:3333/users/1

    - REQUEST BODY: Envio de informações de um Formulário.(HTTPS)
        POST http://localhost:3333/users
*/

const server = http.createServer(async (req, res) => {
    const { method, url} = req;

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        const { query, ...params } = routeParams.groups
        
        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333);