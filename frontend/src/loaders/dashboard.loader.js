import { redirect } from 'react-router-dom'
import { customFetch } from '../utils/fetch.utils'
import { toast } from 'react-toastify'

export const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch('/users')

    return data
  },
}

const dashboardLoader = async (queryClient) => {
  try {
    return await queryClient.ensureQueryData(userQuery)
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return redirect('/')
  }
}

export default dashboardLoader
