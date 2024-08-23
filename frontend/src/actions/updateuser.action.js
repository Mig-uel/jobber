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

const updateUserAction = async (data) => {
  try {
    const { request } = data

    const formData = await request.formData()

    const file = formData.get('avatar')
    if (file && file.size > 500000) {
      toast.error('Image file size too large! ⛔')
      return null
    }

    await customFetch.patch('/users', formData)

    toast.success('Profile updated! 🙌')
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }

  return null
}

export default updateUserAction
