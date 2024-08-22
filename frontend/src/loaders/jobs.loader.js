import { customFetch } from '../utils/fetch.utils'

const jobsLoader = async () => {
  try {
    const { data } = await customFetch('/jobs')

    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export default jobsLoader
