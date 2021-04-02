const express = require("express"); // rotas do express
const routes = express.Router();
// const basePath = __dirname + "/views" // o ejs ja le como padrao o path
const views = __dirname + "/views/";
const Profile = {
  data: {
    name: "Fabio",
    avatar:
      "https://avatars.githubusercontent.com/u/65736019?s=400&u=c8f56e0a069bcb4653973db932035decdb946550&v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75
  },
  controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data })
    },

    update(req, res) {
      //req.body para pegar os Dados
      const data = req.body
      // definir quantas semanas tem num ano
      const weeksPerYear = 52
      //remover as semanas de ferias no ano,para pegar quantas semanas tem em 1 mes
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
      //quantas horas por semana estou trabalhando
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
      //total de horas trabalhadas no mes
      const monthlyTotalHours = weekTotalHours * weeksPerMonth
      // qual sera o valor da minha horas
      const valueHour = data["monthly-budget"] / monthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour,
      };
      return res.redirect("/profile");
    }
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 1,
      created_at: Date.now()
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now()
    }
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        // coloca no status os dias remanecentes, o status e o budget
        const status = remaining <= 0 ? "done" : "progress"
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"]),
        }
      })
      return res.render(views + "index", { jobs: updatedJobs });
    },
    create(req, res) {
      return res.render(views + "job");
    },

    save(req, res) {
      //req. body = { name: 'fabio', 'daily-hours': '10', 'total-hours': '20' }
      const lastId = Job.data[Job.data.length - 1]?.id || 0; // ? é uma condição se existir || este é indicaçao de ou
      // opega o ultimo Id - subitraia 1 e me devolva o array, oum atribua o 1
      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now(), // atribuindo data de hoje
      })
      return res.redirect("/");
    },
    show(req, res) {
      // determinando o id do job
      const jobId = req.params.id
      // verificando se o job que esta na pagina é igual ao do arquivo
      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send("Job not found!")
      }
      job.budget = Job.services.calculateBudget(
        job,
        Profile.data["value-hour"]
      )

      return res.render(views + "job-edit", { job })
    },
    update(req, res){
      // determinando o id do job
      const jobId = req.params.id
      // verificando se o job que esta na pagina é igual ao do arquivo
      const job = Job.data.find(job => Number(job.id) === Number(jobId));

      if (!job) {
        return res.send("Job not found!");
      }
      const updatedJobs={
          ...job, 
          name: req.body.name,
          "total-hours": req.body["total-hours"],
          "daily-hours": req.body["daily-hours"]
      }

      Job.data = Job.data.map(job => { 
        if(Number(job.id)=== Number(jobId)){
            job = updatedJobs
        }  
        return job})
        res.redirect('/job/' + jobId)
    },
    delete(req, res){
        const jobId = req.params.id;

        Job.data = Job.data.filter(job => Number(job.id)!== Number(jobId))
        return res.redirect('/')
    }
  },

  services: {
    remainingDays(job) {
      //ajustes no jobs
      //calculo do tempo restante

      // calculo de total de horar divididos por horas por dia
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
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
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)
      // resta, x dias
      return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
  },
};

// request, response - solicitaçao e resposta
// routes.get('/', (request, response) => {return response.sendFile(basePath + "/index.html")}) modo maior
//routes.get('/', (req,res)=> res.sendFile(basePath + "/index.html")) // alt + shift seta para baixo, duplica a linha
//routes.get('/job', (req,res)=> res.sendFile(basePath + "/job.html"))
//routes.get('/job/edit', (req,res)=> res.sendFile(basePath + "/job-edit.html"))
//routes.get('/profile', (req,res)=> res.sendFile(basePath + "/profile.html"))
//alterando devido a usar o ejs - ferramenta para renderizar o html


routes.get("/", Job.controllers.index);
routes.get("/job", Job.controllers.create);
// metodo posto para pegar dados do fomulario e enviar
// metodo push para pergar os dados req colocar no array jobs
routes.post("/job", Job.controllers.save);
routes.get("/job/:id", Job.controllers.show);
routes.post("/job/:id", Job.controllers.update);
routes.post("/job/delete/:id", Job.controllers.delete);
routes.get("/profile", Profile.controllers.index); // prifile:profile por ser igual a const e o objeto ppode se udar desta forma com um so.
routes.post("/profile", Profile.controllers.update);
// opção de redirecionamento
//routes.get('/index.html', (req,res) => { return res.redirect('/') })
module.exports = routes;
