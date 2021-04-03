const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  
    create(req, res) {
      return res.render("job");
    },

    save(req, res) {
      const jobs = Job.get()
      //req. body = { name: 'fabio', 'daily-hours': '10', 'total-hours': '20' }
      const lastId = jobs[jobs.length - 1]?.id || 0; // ? é uma condição se existir || este é indicaçao de ou
      // opega o ultimo Id - subitraia 1 e me devolva o array, oum atribua o 1
      jobs.push({
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
      const jobs = Job.get()
      const profile =Profile.get()
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

    update(req, res){
      // determinando o id do job
      const jobId = req.params.id
      const jobs = Job.get()
      // verificando se o job que esta na pagina é igual ao do arquivo
      const job = jobs.find(job => Number(job.id) === Number(jobId));
      if (!job) {
        return res.send("Job not found!");
      }
      const updatedJobs={
          ...job, 
          name: req.body.name,
          "total-hours": req.body["total-hours"],
          "daily-hours": req.body["daily-hours"]
      }
      const newJobs = jobs.map(job => { 
        if(Number(job.id)=== Number(jobId)){
            job = updatedJobs
        }  
        return job})
        Job.update(newJobs)
        res.redirect('/job/' + jobId)
    },
    
    delete(req, res){
        const jobId = req.params.id;
        Job.delete(jobId)
        return res.redirect('/')
    }
  } 