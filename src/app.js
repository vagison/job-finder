import connectToDb from './utils/db'
import { initTelegramBot } from './services/telegram/client'
import registerScheduledTasks from './schedule'

async function start() {
  await connectToDb()
  await initTelegramBot()
  registerScheduledTasks()
}

start()
