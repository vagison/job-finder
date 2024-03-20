import TelegramBot from 'node-telegram-bot-api'
import consola from 'consola'

import { telegramConfig } from '../../configs'
import registerEvents from './handlers/eventEstablisher'

const bot = new TelegramBot(telegramConfig.token)

async function initTelegramBot() {
  try {
    registerEvents(bot)
    await bot.startPolling()
    consola.success({ message: 'Telegram bot connected successfully', badge: true })
  } catch (error) {
    consola.error({ message: `Telegram bot connection error: "${error}"`, badge: true })
    process.exit()
  }
}

export { initTelegramBot }

export default bot
