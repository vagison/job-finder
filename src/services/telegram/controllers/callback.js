import { message } from '.'
import { Job } from '../../../models'

async function action(callbackQuery) {
  const chatId = callbackQuery.message.chat.id
  const action = callbackQuery.data.split('_')[0]

  if (action === 'retrieveJobsForQuery') {
    const queryId = callbackQuery.data.split('_')[1]
    const jobs = await Job.find({ queryId }).limit(5)
    const msg = {
      chat: {
        id: chatId,
      },
      text: '',
    }

    if (jobs.length > 0) {
      for (let index = 0; index < jobs.length; index++) {
        msg.text = jobs[index].link
        await message.send(msg)
      }
    } else {
      msg.text = 'There are no jobs saved for this query'
      await message.send(msg)
    }
  }
}

export { action }
