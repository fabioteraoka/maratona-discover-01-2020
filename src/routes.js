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
    "vacation-per-year": 4,
    "value-hour": 620
}

const jobs =[
    {
        id:1,
        name: "Pizzaria Guloso",
        "daily-hours":4,
        "total-hours":1,
        created_at: Date.now()
    },
    {
        id:2,
        name: "OneTwo Project",
        "daily-hours":3,
        "total-hours":47,
        created_at: Date.now()
    }
]
// request, response - solicitaçao e resposta
// routes.get('/', (request, response) => {return response.sendFile(basePath + "/index.html")}) modo maior
//routes.get('/', (req,res)=> res.sendFile(basePath + "/index.html")) // alt + shift seta para baixo, duplica a linha
//routes.get('/job', (req,res)=> res.sendFile(basePath + "/job.html"))
//routes.get('/job/edit', (req,res)=> res.sendFile(basePath + "/job-edit.html"))
//routes.get('/profile', (req,res)=> res.sendFile(basePath + "/profile.html"))
//alterando devido a usar o ejs - ferramenta para renderizar o html

function remainingDays(job){
     //ajustes no jobs
    //calculo do tempo restante
    
        // calculo de total de horar divididos por horas por dia
        const remainingDays = (job["total-hours"]/ job["daily-hours"]).toFixed()
        // calculo de dia que colocou o provejo, base de calculo
        const createdDate = new Date(job.created_at)
        // calculo da data limite
        const dueDay = createdDate.getDate() + Number(remainingDays) 
        // calculo dos dias que faltam a contar da data atual
        const dueDateInMs = createdDate.setDate(dueDay)
        //caculo da diferenca em milesegundos 
        const timeDiffInMs = dueDateInMs - Date.now()
        // transformar dias em milisegundos 
        const dayInMs = 1000 * 60 * 60 * 24
        // calcula dos dias restantes math.floor arredonda para baixo
        const dayDiff = Math.floor(timeDiffInMs/ dayInMs)
        // resta, x dias
        return dayDiff
}
routes.get('/', (req,res)=> {
    
    const updatedJobs = jobs.map((job) => { 
    const remaining = remainingDays(job)
    // coloca no status os dias remanecentes, o status e o budget
    const status = remaining <= 0 ? 'done' : 'progress'
    return {
        ...job,
        remaining,
        status, 
        budget: profile["value-hour"] * job["total-hours"]
    }
    })
    return res.render(views + "index",{jobs:updatedJobs})
})
routes.get('/job', (req,res)=> res.render(views + "job"))
// metodo posto para pegar dados do fomulario e enviar 
// metodo push para pergar os dados req colocar no array jobs

routes.post('/job', (req,res)=> {
   //req. body = { name: 'fabio', 'daily-hours': '10', 'total-hours': '20' }
   const lastId = jobs[jobs.length - 1]?.id || 1; // ? é uma condição se existir || este é indicaçao de ou
// opega o ultimo Id - subitraia 1 e me devolva o array, oum atribua o 1
    jobs.push({
        id: lastId + 1,
        name:req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // atribuindo data de hoje 
    })
    return res.redirect('/')
})

routes.get('/job/edit', (req,res)=> res.render(views + "job-edit"))
routes.get('/profile', (req,res)=> res.render(views + "profile", {profile})) // prifile:profile por ser igual a const e o objeto ppode se udar desta forma com um so.
// opção de redirecionamento
//routes.get('/index.html', (req,res) => { return res.redirect('/') })
module.exports = routes;
 
