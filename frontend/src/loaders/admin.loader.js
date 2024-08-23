import { redirect } from 'react-router-dom'
import { customFetch } from '../utils/fetch.utils'
import { toast } from 'react-toastify'

const adminLoader = async () => {
  try {
    const { data } = await customFetch.get('/admin/stats')

    toast.success('Admin data loaded! 🎉')
    return data
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return redirect('/dashboard/jobs')
  }
}

export default adminLoader
