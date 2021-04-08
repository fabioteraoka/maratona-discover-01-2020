const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  
    create(req, res) {
      return res.render("job");
    },

    async save(req, res) {
     // const jobs = await Job.get() Apagado depois da conexao com o banco
      //req. body = { name: 'fabio', 'daily-hours': '10', 'total-hours': '20' }
     // const lastId = jobs[jobs.length - 1]?.id || 0; // ? é uma condição se existir || este é indicaçao de ou
      // opega o ultimo Id - subitraia 1 e me devolva o array, oum atribua o 1, Apagado depois da conexao com o banco
      
      await Job.create({
       // id: lastId + 1,  Apagado depois da conexao com o banco
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now(), // atribuindo data de hoje
      })
    
      return res.redirect("/");
    },
    
    async show(req, res) {
      // determinando o id do job
      const jobId = req.params.id
      const jobs = await Job.get()
      const profile = await Profile.get()
      // verificando se o job que esta na pagina é igual ao do arquivo
      const job = jobs.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send("Job not found!")
      }
      job.budget = JobUtils.calculateBudget(
        job,
        profile["value-hour"]
      )

      return res.render("job-edit", { job })
    },

    async update(req, res){
      // determinando o id do job
      const jobId = req.params.id
      
      const updatedJobs={
          name: req.body.name,
          "total-hours": req.body["total-hours"],
          "daily-hours": req.body["daily-hours"]
      }
        await Job.update(updatedJobs, jobId)
        res.redirect('/job/' + jobId)
    },
    
    async delete(req, res){
        const jobId = req.params.id;
        await Job.delete(jobId)
        return res.redirect('/')
    }
  } 