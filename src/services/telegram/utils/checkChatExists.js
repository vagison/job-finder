import { errorLogger } from '../../../utils/error'
import bot from '../client'

async function checkChatExists(chatId) {
  try {
    await bot.getChat(chatId)

    return true
  } catch (error) {
    if (!error.response || !error.response.body.error_code === 400) {
      errorLogger(error)
    }

    return false
  }
}

export default checkChatExists
