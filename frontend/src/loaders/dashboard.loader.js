import { redirect } from 'react-router-dom'
import { customFetch } from '../utils/fetch.utils'
import { toast } from 'react-toastify'

const dashboardLoader = async () => {
  try {
    const { data } = await customFetch('/users')

    return data
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return redirect('/')
  }
}

export default dashboardLoader
