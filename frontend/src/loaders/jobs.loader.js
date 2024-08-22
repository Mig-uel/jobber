import { customFetch } from '../utils/fetch.utils'
import { toast } from 'react-toastify'

const jobsLoader = async () => {
  try {
    const { data } = await customFetch.get('/jobs')

    return data
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}

export default jobsLoader
