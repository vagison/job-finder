import moment from 'moment'
import { queryProviders, jobProviders } from '../providers'
import * as telegramControllers from '../services/telegram/controllers'
import { createMessageFromJob, createMessageFromText } from '../shared/message'
import { sortArrayOfObjectsByDate } from '../utils/sorting'

async function collectJobsAndSendToOwners() {
  const taskStart = Date.now()
  const queriesGrouppedByChatIds = await queryProviders.getQueriesGrouppedByChatId()

  for (let i = 0; i < queriesGrouppedByChatIds.length; i++) {
    const { chatId } = queriesGrouppedByChatIds[i]
    const queries = queriesGrouppedByChatIds[i].queries

    const sequentialBatchMsg = createMessageFromText(chatId, `${moment().format('DD-MM-YYYY, HH:mm:ss')} - sending jobs for your queries`)
    const sequentialBatchMsgSent = await telegramControllers.message.send(sequentialBatchMsg)

    if (sequentialBatchMsgSent.error) {
      continue
    }

    for (let j = 0; j < queries.length; j++) {
      const query = queries[j]
      const jobs = await jobProviders.fetchAndCreateJobsForQuery(query)

      if (jobs && jobs.length > 0) {
        const queryJobsMsg = createMessageFromText(chatId, `Sending a batch of ${jobs.length} jobs for "${query.title}" query`)
        await telegramControllers.message.send(queryJobsMsg)

        const jobsSorted = sortArrayOfObjectsByDate(jobs, 'publishDate', 'ASC')

        for (let k = 0; k < jobsSorted.length; k++) {
          const msg = createMessageFromJob(chatId, jobsSorted[k])
          await telegramControllers.message.send(msg)
        }
      }
    }
  }

  console.log(`New jobs collection and sending task has been performed within ${(Date.now() - taskStart) / 1000} seconds.`)
}

export { collectJobsAndSendToOwners }
