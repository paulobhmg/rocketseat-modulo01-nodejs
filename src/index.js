express = require('express');
app = express();

/** Métodos HTTP
 * GET - Buscar informações em recursos
 * POST - Criar novos dados na aplicação
 * PUT/PATCH - Alterar informações de um recurso
 * DELETE - Remover determinado recurso
 */

 app.get('/projetos', (req, res) => res.json([
   'Projeto 1',
   'Projeto 2'
 ]));

 app.post('/projetos', (req, res) => res.json([
   'Projeto 1',
   'Projeto 2',
   'Projeto 3'
 ]));

 app.put('/projetos/:id', (req, res) => res.json([
   'Projeto 1',
   'Projeto 2',
   'Projeto sem nome'
 ]));

 app.delete('/projetos/:id', (req, res) => res.json([
   'Projeto 2',
   'Projeto sem nome'
 ]));

app.get('/', (req, res) => res.send('Hello Word!'));
app.get('/index', (req, res) => res.json({message: "Hello World, again!"}));

app.listen(3333);