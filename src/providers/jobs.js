import { Job } from '../models'
import { jobsFetcher } from '../shared/fetcher'
import { errorLogger } from '../utils/error'
import { errorMessages } from '../constants'

async function fetchAndCreateJobsForQuery(query) {
  try {
    const queryId = query._id
    const fetchedJobs = await jobsFetcher(query)

    // Fetch all existing documents based on the provided jobIds and queryIds
    const existingJobsFilter = {
      $or: fetchedJobs.map((job) => {
        return {
          queryId,
          jobId: job.jobId,
        }
      }),
    }
    const existingJobs = await Job.find(existingJobsFilter).select('queryId jobId').exec()
    const existingMap = new Map(existingJobs.map((job) => [`${job.queryId}-${job.jobId}`, job]))

    // Filter out the existing documents from the array and appending queryId and createdAt to each job
    const createdAt = new Date()
    const newJobs = fetchedJobs
      .filter((job) => !existingMap.has(`${queryId}-${job.jobId}`))
      .map((job) => {
        return {
          queryId,
          ...job,
          createdAt,
        }
      })

    // Create new documents for those not found in the existing documents
    const createdJobs = await Job.insertMany(newJobs)

    return createdJobs
  } catch (error) {
    console.log(errorMessages.jobsCreationError + query._id)
    errorLogger(error)
  }
}

export { fetchAndCreateJobsForQuery }
