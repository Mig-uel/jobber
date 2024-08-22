import { redirect } from 'react-router-dom'
import { customFetch } from '../utils/fetch.utils'

const dashboardLoader = async () => {
  try {
    const { data } = await customFetch('/users')

    return data
  } catch (error) {
    return redirect('/')
  }
}

export default dashboardLoader
