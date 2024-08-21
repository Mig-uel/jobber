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
import { redirect } from 'react-router-dom'

// only use 'redirect' in an action
const registerAction = async (data) => {
  try {
    const { request } = data

    // get the form input
    const formData = await request.formData()

    // transform the input values to an object
    const signupData = Object.fromEntries(formData)

    await customFetch.post('/auth/register', signupData)

    return redirect('/login')
  } catch (error) {
    console.log(error)

    return error
  }
}

export default registerAction
