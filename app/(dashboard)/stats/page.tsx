import ChartsContainer from '@/components/ChartsContainer'
import StatsContainer from '@/components/StatsContainer'
import { getChartData, getStats } from '@/utils/actions'

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['stats'],

    queryFn: () => getStats(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['charts'],

    queryFn: () => getChartData(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />

      <ChartsContainer />
    </HydrationBoundary>
  )
}
