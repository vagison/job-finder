import { fetchAndProcessJobs as fetchJobsFromUpwork } from '../services/upwork'

const jobsFetchingFunctions = {
  upwork: fetchJobsFromUpwork,
}

async function jobsFetcher(query) {
  return await jobsFetchingFunctions[query.platform](query.value)
}

export { jobsFetcher }
