const Database =require ('../db/config')

  module.exports ={
      async get(){
        const db = await Database()
        const jobs = await db.all('SELECT * FROM jobs')

        await db.close()

          return jobs.map((job) =>({
              id: job.id,
              name: job.name,
              "daily-hours": job.daily_hours,
              "total-hours": job.total_hours,
              created_at: job.created_at
          }))
      },
      async update(updadetedJob,jobId){
        const db = await Database()
        await db.run(`UPDATE jobs SET
        name = "${updadetedJob.name}",
        daily_hours = ${updadetedJob["daily-hours"]},
        total_hours = ${updadetedJob["total-hours"]}
        WHERE id =${jobId}
        `)
        await db.close()
      },

      async delete(id){
        const db = await Database()
        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
      },

      async create(newJob){
        const db = await Database()
        await db.run(`INSERT INTO jobs (
          name,
          daily_hours,
          total_hours,
          created_at
        ) VALUES (
          "${newJob.name}",
          ${newJob["daily-hours"]},
          ${newJob["total-hours"]},
          ${newJob.created_at}
        )`)

        await db.close()
        
      }
  }