import { customFetch } from '../utils/fetch.utils'

export const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const { data } = await customFetch.get('/jobs/stats')

    return data
  },
}

const statsLoader = async (queryClient) => {
  const data = await queryClient.ensureQueryData(statsQuery)

  return data
}

export default statsLoader
