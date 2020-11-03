express = require('express');
app = express();
const {v4} = require('uuid');
const {isUuid} = require('uuidv4');

//Habilita o expresponses para receber body params em formato JSON
app.use(express.json());

let projects = [];

/** Métodos HTTP
 * GET - Buscar informações em recursos
 * POST - Criar novos dados na aplicação
 * PUT/PATCH - Alterar informações de um recurso
 * DELETE - Remover determinado recurso
 * 
 * Os métodos HTTP podem ou não receber parâmetros e os mais utilizados são:
 * Query Params - mais utilizados para filtros e paginação
 * Route Params - Utilizados para informar qual é o recurso que será utilizado
 * Body Params  - Utilizados para coletar as informações de formulários, etc
 * 
 * Middlewaresponse são interceptadoresponse que podem ou não bloquear a sequência de execução
 * de um programa.
 */

function myMiddleware(request, response, next){
  const {method, url} = request;
  const label = `[${method}]`.toUpperCase() + ` ${url}`;
  console.log(label);
  
  return next();
}

function verifyRequestId(request, response, next){
  const {id} = request.params;

  if(!isUuid(id)){
    return response.json({message: "Invalid request ID."});
  }

  return next();
}

app.use(myMiddleware);

app.get('/projects', (request, response) => {
  const {title} = request.query;
  const responseults = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(responseults);
});

app.post('/projects', (request, response) => {
  const {title, owner} = request.body;
  const project = {id: v4(), title, owner};
  projects.push(project);
  
  return response.json(project);
});

app.put('/projects/:id', verifyRequestId, (request, response) => {
  const {id} = request.params;
  const {title, owner} = request.body;
  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0){
    return response.status(400).json({"message": "project not found"});
  }

  const project = {id, title, owner};
  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', verifyRequestId, (request, response) => {
  const {id} = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0){
    return response.json({"message": "Project not founded"});
  }
  
  const title = projects[projectIndex].title;
  projects.splice(projectIndex, 1);

  return response.status(200).send(`Project '${title}' was removed.`);
});

app.get('/', (request, response) => response.send('Hello Word!'));
app.get('/index', (request, response) => response.json({message: "Hello World, again!"}));

app.listen(3333);