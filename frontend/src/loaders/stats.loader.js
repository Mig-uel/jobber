import { customFetch } from '../utils/fetch.utils'

const statsLoader = async () => {
  const { data } = await customFetch.get('/jobs/stats')

  return data
}

export default statsLoader
