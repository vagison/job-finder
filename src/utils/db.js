import mongoose from 'mongoose'
import consola from 'consola'

import { dbConfig } from '../configs'

const connectToDb = async () => {
  mongoose.set('strictQuery', false)
  mongoose.set('debug', dbConfig.isDebugEnabled)
  const db = mongoose.connection

  db.on('open', () => {
    consola.success({ message: 'DB connection established', badge: true })
  })

  db.on('error', (err) => {
    consola.error({ message: `DB connection error: "${err}"`, badge: true })
    process.exit()
  })

  return mongoose.connect(dbConfig.dbUri, {
    dbName: dbConfig.dbName,
  })
}

export default connectToDb
