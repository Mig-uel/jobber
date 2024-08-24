import { customFetch } from '../utils/fetch.utils'
import { toast } from 'react-toastify'

const jobsLoader = async ({ request }) => {
  try {
    const { url } = request

    const searchParams = new URL(url).searchParams.entries()
    const params = Object.fromEntries([...searchParams])

    const { data } = await customFetch.get('/jobs', { params })

    return data
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}

export default jobsLoader
