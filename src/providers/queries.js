import { Query } from '../models'
import { errorLogger } from '../utils/error'

async function getQueriesGrouppedByChatId() {
  try {
    // Aggregation pipeline to group documents by chatId and sort by createdAt in descending order
    return await Query.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: '$chatId',
          chatId: {
            $first: '$chatId',
          },
          queries: {
            $push: '$$ROOT',
          }, // Push all documents of each group into an array
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the output
          chatId: 1, // Include chatId field in the output
          queries: 1, // Include queries field in the output
        },
      },
    ])
  } catch (error) {
    errorLogger(error)
    return []
  }
}

export { getQueriesGrouppedByChatId }
