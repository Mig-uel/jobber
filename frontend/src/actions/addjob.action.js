/**
 * ADD JOB POST BODY
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

const addJobAction = (queryClient) => async (data) => {
  try {
    const { request } = data

    // get form data from form via react router FormData
    const formData = await request.formData()

    // transform formData into object
    const jobData = Object.fromEntries(formData)

    await customFetch.post('/jobs', jobData)

    // invalidate query cache
    queryClient.invalidateQueries(['jobs'])

    toast.success('Job added! 🙌')
    return redirect('jobs')
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}

export default addJobAction
