/**
 * EDIT JOB PATCH BODY
 * {
 *    company
 *    position
 *    status
 *    type
 *    location
 * }
 */

import { redirect } from 'react-router-dom'
import { customFetch } from '../utils/fetch.utils'
import { toast } from 'react-toastify'

const editJobAction = (queryClient) => async (data) => {
  try {
    const {
      params: { id },
      request,
    } = data

    const formData = await request.formData()

    const editData = Object.fromEntries(formData)

    await customFetch.patch(`/jobs/${id}`, editData)

    // invalidate query cache
    queryClient.invalidateQueries(['jobs'])

    toast.success('Updated job posting! 🎉')
    return redirect('/dashboard/jobs')
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}

export default editJobAction
