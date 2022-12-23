// fazendo uma chamada, solicita o pacote express dentro de uma constante express
//const { request, response } = require("express")
const express = require("express") 
// o valor recebido do require foi colocado em na constante express, agora vai rodar
const app = express()
const routes = require ("./routes")
const path = require("path")
// criando a view engine para processas o meu html, template engine
app.set('view engine', 'ejs')
// mudar a localizacao da pasta views
// const basePath = __dirname + "/views" // o ejs ja le como padrao o path
app.set('views', path.join(__dirname , "views"))
// habilita uma nova funcionalidade no server.get - habilita arquivos estaticos
app.use(express.static("public"))
//usar o reg.body - esta habilitando a requisicao do meto post
app.use(express.urlencoded({extended:true}))
//routes
app.use(routes)
//server.listen(3000, () => console.log ('rodando')) //posso fazer forma longa server.listen (3000, function(){console.log('rodando')}) ¡

// HEROKU
const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log('rodando'));