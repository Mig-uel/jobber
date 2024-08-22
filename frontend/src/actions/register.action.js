/**
 * REGISTER POST BODY
 * {
 *    firstName
 *    lastName
 *    email
 *    password
 * }
 */

import { customFetch } from '../utils/fetch.utils'
import { redirect } from 'react-router-dom' // only use 'redirect' in actions
import { toast } from 'react-toastify'

const registerAction = async (data) => {
  try {
    const { request } = data

    // get the form input
    const formData = await request.formData()

    // transform the input values to an object
    const signupData = Object.fromEntries(formData)

    await customFetch.post('/auth/register', signupData)

    toast.success('Registration successful')
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.message)

    return error
  }
}

export default registerAction
