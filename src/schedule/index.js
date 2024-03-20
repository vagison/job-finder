import schedule from 'node-schedule'
import * as jobsScheduling from './jobs'

function registerScheduledTasks() {
  schedule.scheduleJob('*/5 * * * *', async function () {
    await jobsScheduling.collectJobsAndSendToOwners()
  })
}

export default registerScheduledTasks
