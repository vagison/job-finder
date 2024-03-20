import axios from 'axios'

async function fetchXMLData(url) {
  const response = await axios.get(url)
  return response.data
}

export { fetchXMLData }
