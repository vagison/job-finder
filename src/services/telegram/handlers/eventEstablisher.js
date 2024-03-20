import consola from 'consola'

import { message, callback } from '../controllers'

function registerEvents(bot) {
  bot.on('polling_error', (error) => {
    consola.error({ message: `Telegram bot connection error: "${error}"`, badge: true })
    process.exit()
  })

  bot.on('message', async (msg) => {
    await message.send(msg)
  })

  bot.on('callback_query', async (callbackQuery) => {
    await callback.action(callbackQuery)
  })
}

export default registerEvents
