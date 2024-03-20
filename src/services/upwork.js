import { parseStringPromise } from 'xml2js'
import { URL } from 'url'
import sanitizeHtml from 'sanitize-html'

import { fetchXMLData } from '../utils/xml'
import { errorLogger } from '../utils/error'

async function processJobs(xmlData) {
  const parsedXMLData = await parseStringPromise(xmlData)
  const items = parsedXMLData.rss.channel[0].item

  const processedJobs = items.map((item) => {
    const parsedUrl = new URL(item.link[0])
    const jobId = decodeURI(parsedUrl.pathname.split('_')[1].split('?')[0]).slice(1)
    const title = item.title[0]
    const link = item.link[0]
    const publishDate = item.pubDate
    const description = sanitizeHtml(item.description[0], {
      allowedTags: [],
      allowedAttributes: {},
    })

    // TODO: Validate data
    const job = {
      jobId,
      title,
      link,
      publishDate,
      description,
    }

    return job
  })

  return processedJobs
}

async function fetchAndProcessJobs(rssFeedURL) {
  try {
    const xmlData = await fetchXMLData(rssFeedURL)
    return await processJobs(xmlData)
  } catch (error) {
    errorLogger(error)
    return []
  }
}

export { fetchAndProcessJobs }
