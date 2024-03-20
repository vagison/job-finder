import mongoose from 'mongoose'

const QuerySchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    toObject: {
      virtuals: true,
    },
  }
)

const Query = mongoose.model('Query', QuerySchema)

export default Query
