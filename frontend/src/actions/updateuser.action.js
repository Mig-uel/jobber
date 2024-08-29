/**
 * UPDATE USER PATCH BODY
 * {
 *    firstName
 *    lastName
 *    email
 *    password
 *    confirmPassword
 *    avatar
 * }
 */

import { toast } from 'react-toastify'
import { customFetch } from '../utils/fetch.utils'
import { redirect } from 'react-router-dom'

const updateUserAction = (queryClient) => async (data) => {
  try {
    const { request } = data

    const formData = await request.formData()

    const file = formData.get('avatar')
    if (file && file.size > 500000) {
      toast.error('Image file size too large! ⛔')
      return null
    }

    await customFetch.patch('/users', formData)

    // invalidate user cache
    queryClient.invalidateQueries(['user'])

    toast.success('Profile updated! 🙌')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }

  return null
}

export default updateUserAction
