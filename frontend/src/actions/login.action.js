/**
 * LOGIN POST BODY
 * {
 *    email
 *    password
 * }
 */

import { customFetch } from '../utils/fetch.utils'
import { redirect } from 'react-router-dom' // only use 'redirect' in actions
import { toast } from 'react-toastify'

const loginAction = async (data) => {
  try {
    const { request } = data

    // get the form input
    const formData = await request.formData()

    // transform formData into object
    const loginData = Object.fromEntries(formData)

    // send post request and store request to use in toast message
    const user = await customFetch.post('/auth/login', loginData)

    console.log(user)

    toast.success('Welcome back, [user]!')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.message)

    return error
  }
}

export default loginAction
