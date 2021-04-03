const express = require("express") // rotas do express
const routes = express.Router()
const ProfileController = require("./controllers/ProfileController")
const JobController = require("./controllers/JobController")
const DashboardController = require("./controllers/DashboardController")
// request, response - solicitaçao e resposta
// routes.get('/', (request, response) => {return response.sendFile(basePath + "/index.html")}) modo maior
//routes.get('/', (req,res)=> res.sendFile(basePath + "/index.html")) // alt + shift seta para baixo, duplica a linha
//routes.get('/job', (req,res)=> res.sendFile(basePath + "/job.html"))
//routes.get('/job/edit', (req,res)=> res.sendFile(basePath + "/job-edit.html"))
//routes.get('/profile', (req,res)=> res.sendFile(basePath + "/profile.html"))
//alterando devido a usar o ejs - ferramenta para renderizar o html
// metodo posto para pegar dados do fomulario e enviar
// metodo push para pergar os dados req colocar no array jobs

routes.get("/", DashboardController.index);
routes.get("/job", JobController.create);
routes.post("/job", JobController.save);
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
routes.get("/profile", ProfileController.index); // prifile:profile por ser igual a const e o objeto ppode se udar desta forma com um so.
routes.post("/profile", ProfileController.update);
// opção de redirecionamento
//routes.get('/index.html', (req,res) => { return res.redirect('/') })
module.exports = routes;
