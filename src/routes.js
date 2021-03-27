const express = require("express");// rotas do express
const routes = express.Router()
// const basePath = __dirname + "/views" // o ejs ja le como padrao o path
const views =  __dirname + "/views/"
const profile ={
    name: "Fabio",
    avatar: "https://avatars.githubusercontent.com/u/65736019?s=400&u=c8f56e0a069bcb4653973db932035decdb946550&v=4",
    "monthly-budget":3000,
    "hours-per-day": 5,
    "days-per-week": 30,
    "vacation-per-year": 4
}
// request, response - solicitaçao e resposta
// routes.get('/', (request, response) => {return response.sendFile(basePath + "/index.html")}) modo maior
//routes.get('/', (req,res)=> res.sendFile(basePath + "/index.html")) // alt + shift seta para baixo, duplica a linha
//routes.get('/job', (req,res)=> res.sendFile(basePath + "/job.html"))
//routes.get('/job/edit', (req,res)=> res.sendFile(basePath + "/job-edit.html"))
//routes.get('/profile', (req,res)=> res.sendFile(basePath + "/profile.html"))
//alterando devido a usar o ejs - ferramenta para renderizar o html
routes.get('/', (req,res)=> res.render(views + "index", {profile})) 
routes.get('/job', (req,res)=> res.render(views + "job"))
routes.get('/job/edit', (req,res)=> res.render(views + "job-edit"))
routes.get('/profile', (req,res)=> res.render(views + "profile", {profile})) // prifile:profile por ser igual a const e o objeto ppode se udar desta forma com um so.
// opção de redirecionamento
//routes.get('/index.html', (req,res) => { return res.redirect('/') })
module.exports = routes;
 
