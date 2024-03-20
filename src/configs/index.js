import dotenv from 'dotenv'
dotenv.config()

const dbConfig = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}`,
  isDebugEnabled: process.env.DB_DEBUG === 'true',
}

const telegramConfig = {
  token: process.env.TELEGRAM_BOT_API_TOKEN,
}

export { dbConfig, telegramConfig }
