import bot from '../client'
import { Query } from '../../../models'
import { errorMessages } from '../../../constants'
import { errorLogger } from '../../../utils/error'

async function send(msg) {
  try {
    const chatId = msg.chat.id
    const message = msg.text
    const response = [chatId]

    if (message === '/start') {
      response.push(`Please select one of the following options: \n /registerQuery \n /retrieveSavedQueries`)
    } else if (message === '/registerQuery') {
      response.push(
        `Please send a message as in the following example:\n\n"query: node.js; platform: upwork; title: upwork query for node.js" \n\nWhere the query is some string you want to search (in case of upwork please provide your RSS feed URL), the platform is the one you are interested in and the title is a name you want to label the query with.`
      )
    } else if (message === '/retrieveSavedQueries') {
      const more = {
        reply_markup: {
          inline_keyboard: [],
        },
      }
      const queries = await Query.find({ chatId })

      queries.forEach((query, idx) => {
        const option = [
          {
            text: `${idx + 1}) "${query.title}" on ${query.platform}`,
            callback_data: `retrieveJobsForQuery_${query._id.toString()}`,
          },
        ]
        more.reply_markup.inline_keyboard.push(option)
      })

      response.push('Please select an option from your saved queries to retrieve latest 5 jobs cached from the platform', more)
    } else if (/^query:/i.test(message)) {
      try {
        const keyValuePairs = message.split(';')
        const obj = {}

        keyValuePairs.forEach((pair) => {
          const [key, value] = pair.trim().split(':')
          obj[key.trim()] = value.trim()
        })

        if (!obj.query || !obj.platform || !obj.title) {
          throw errorMessages.missingArguments
        }

        const data = {
          chatId,
          value: obj.query,
          platform: obj.platform,
          title: obj.title,
        }

        await Query.create(data)

        response.push('Received query successfully saved')
      } catch (error) {
        response.push(errorMessages.queryMalformed)
        errorLogger(error)
      }
    } else {
      response.push(message)
    }

    return await bot.sendMessage(...response)
  } catch (error) {
    console.log(errorMessages.sendMessage)
    errorLogger(error)

    return {
      error: {
        statusCode: error.response.statusCode,
        statusMessage: error.response.statusMessage,
      },
    }
  }
}

export { send }
