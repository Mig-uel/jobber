import { customFetch } from '../utils/fetch.utils'

export const allJobsQuery = (params) => {
  const { search, status, type, sort, page } = params

  return {
    queryKey: [
      'jobs',
      search ?? '',
      status ?? 'all',
      type ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs', { params })

      return data
    },
  }
}

const jobsLoader =
  (queryClient) =>
  async ({ request }) => {
    const { url } = request

    const searchParams = new URL(url).searchParams.entries()
    const params = Object.fromEntries([...searchParams])

    await queryClient.ensureQueryData(allJobsQuery(params))

    return { searchValues: { ...params } }
  }

export default jobsLoader
