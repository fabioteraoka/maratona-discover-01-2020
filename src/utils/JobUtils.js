module.exports = {
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
  }