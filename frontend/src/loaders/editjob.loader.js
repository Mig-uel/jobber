import { toast } from 'react-toastify'
import { customFetch } from '../utils/fetch.utils'
import { redirect } from 'react-router-dom'

const editJobLoader = async ({ params }) => {
  try {
    const { id } = params
    const { data } = await customFetch.get(`/jobs/${id}`)

    return data
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return redirect('/dashboard/jobs')
  }
}

export default editJobLoader
