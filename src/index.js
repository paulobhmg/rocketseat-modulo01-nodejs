express = require('express');
app = express();
const {v4} = require('uuid');

//Habilita o express para receber body params em formato JSON
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
 */

 app.get('/projects', (req, res) => {
   const {title} = req.query;
   const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

   return res.json(results);
 });

 app.post('/projects', (req, res) => {
   const {title, owner} = req.body;
   const project = {id: v4(), title, owner};
   projects.push(project);
   
   return res.json(project);
 });

 app.put('/projects/:id', (req, res) => {
   const {id} = req.params;
   const {title, owner} = req.body;
   const projectIndex = projects.findIndex(project => project.id === id);

   if(projectIndex < 0){
     return res.status(400).json({"message": "project not found"});
   }

   const project = {id, title, owner};
   projects[projectIndex] = project;

   return res.json(project);
 });

 app.delete('/projects/:id', (req, res) => {
   const {id} = req.params;
   const projectIndex = projects.findIndex(project => project.id === id);

   if(projectIndex < 0){
     return res.json({"message": "Project not founded"});
   }
   
   const title = projects[projectIndex].title;
   projects.splice(projectIndex, 1);

   return res.status(200).send(`Project '${title}' was removed.`);
 });

app.get('/', (req, res) => res.send('Hello Word!'));
app.get('/index', (req, res) => res.json({message: "Hello World, again!"}));

app.listen(3333);