import { AddJobForm } from '@/components/index'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default function Page() {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AddJobForm />
    </HydrationBoundary>
  )
}
