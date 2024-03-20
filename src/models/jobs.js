import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    queryId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Query',
    },
    jobId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
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

const Job = mongoose.model('Job', JobSchema)

export default Job
