import { JobsList, SearchForm } from '@/components/index'
import { getAllJobs } from '@/utils/actions'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['jobs', '', 'all', 1],

    queryFn: () => getAllJobs({}),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />

      <JobsList />
    </HydrationBoundary>
  )
}
