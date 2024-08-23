/**
 * DELETE JOB
 */

import { redirect } from 'react-router-dom'
import { customFetch } from '../utils/fetch.utils'
import { toast } from 'react-toastify'

const deleteJobLoader = async ({ params }) => {
  try {
    const { id } = params

    await customFetch.delete(`/jobs/${id}`)

    toast.success('Deleted job posting! 🗑️')
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }

  return redirect('/dashboard/jobs')
}

export default deleteJobLoader
